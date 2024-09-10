import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { GrantOpportunityResolver } from './grant-opportunity.resolver';
import { GrantOpportunity } from '../postgres/pg-models/grant-opportunity.entity';
import { Status, DiverseStatus, AreaOfFunding } from '../common/enums';
import { PaginatedGrantOpportunities } from './graphql/PaginatedGrantOpportunities';

const mockGrantOpportunityRepo = () => ({
  find: jest.fn(),
  findAndCount: jest.fn(),
  findOneBy: jest.fn(),
  save: jest.fn(),
});

const mockGrant = {
  title: 'Magmina Foundation Grant',
  comment: null,
  location: 'Hessville, North Dakota',
  avgAmount: 65000,
  matchDate: '2025-01-20',
  companyName: 'Magmina Foundation',
  description:
    'Mollit quis aliqua officia commodo laborum velit dolore aliqua.',
  deadLineDate: '2024-12-02',
  areaOfFunding: [
    AreaOfFunding.RELIGIOUS_AND_SPIRITUAL_ENDEAVORS,
    AreaOfFunding.VETERANS_ISSUES,
    AreaOfFunding.PUBLIC_HEALTH_WOMEN,
    AreaOfFunding.ENVIROMENT_ART,
    AreaOfFunding.MEDICAL_ASSISGTANCE,
    AreaOfFunding.CULTURE_FOOD,
  ],
} as GrantOpportunity;

describe('GrantOpportunityResolver', () => {
  let resolver: GrantOpportunityResolver;
  let grantOpportunityRepo: jest.Mocked<Repository<GrantOpportunity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GrantOpportunityResolver,
        {
          provide: getRepositoryToken(GrantOpportunity),
          useValue: mockGrantOpportunityRepo(),
        },
      ],
    }).compile();

    resolver = module.get<GrantOpportunityResolver>(GrantOpportunityResolver);
    grantOpportunityRepo = module.get(getRepositoryToken(GrantOpportunity));
  });

  describe('getNewOpportunities', () => {
    it('should return an array of new grant opportunities', async () => {
      const mockGrants = [
        {
          ...mockGrant,
          status: Status.NEW,
        },
      ];

      grantOpportunityRepo.find.mockResolvedValue(mockGrants);

      const result = await resolver.getNewOpportunities();
      expect(result).toEqual(mockGrants);
      expect(grantOpportunityRepo.find).toHaveBeenCalledWith({
        where: { status: Status.NEW },
      });
    });

    it('should throw an error if there is a failure', async () => {
      grantOpportunityRepo.find.mockRejectedValue(
        new Error('Failed to get grants with status NEW'),
      );

      await expect(resolver.getNewOpportunities()).rejects.toThrow(
        'Failed to get grants with status NEW',
      );
    });
  });

  describe('getAllOpportunities', () => {
    it('should return all grant opportunities', async () => {
      const mockGrants = [
        {
          ...mockGrant,
          status: Status.NEW,
        },
      ];
      grantOpportunityRepo.find.mockResolvedValue(mockGrants);

      const result = await resolver.getAllOpportunities();
      expect(result).toEqual(mockGrants);
      expect(grantOpportunityRepo.find).toHaveBeenCalledWith();
    });

    it('should throw an error if there is a failure', async () => {
      grantOpportunityRepo.find.mockRejectedValue(
        new Error('Failed to get all grants'),
      );

      await expect(resolver.getAllOpportunities()).rejects.toThrow(
        'Failed to get all grants',
      );
    });
  });

  describe('grants', () => {
    it('should return paginated grant opportunities based on status', async () => {
      const mockGrants = [
        {
          ...mockGrant,
          status: Status.NEW,
        },
      ];
      const totalItems = 1;
      grantOpportunityRepo.findAndCount.mockResolvedValue([
        mockGrants,
        totalItems,
      ]);

      // Execute the resolver function
      const result: PaginatedGrantOpportunities = await resolver.grants(
        DiverseStatus.NEW,
        1,
        10,
      );

      // Verify the structure of the returned PaginatedGrantOpportunities
      expect(result).toEqual({
        items: mockGrants,
        totalPages: 1,
      });

      expect(grantOpportunityRepo.findAndCount).toHaveBeenCalledWith({
        where: { status: In([Status.NEW]) },
        take: 10,
        skip: 0,
      });
    });

    it('should throw an error if there is a failure', async () => {
      grantOpportunityRepo.findAndCount.mockRejectedValue(
        new Error('Failed to get paginated grants'),
      );

      await expect(resolver.grants(DiverseStatus.NEW, 1, 10)).rejects.toThrow(
        'Failed to to get paginated grants',
      );
    });
  });

  describe('updateOpportunityStatus', () => {
    it('should update the status of a grant opportunity', async () => {
      grantOpportunityRepo.findOneBy.mockResolvedValue(mockGrant);
      grantOpportunityRepo.save.mockResolvedValue({
        ...mockGrant,
        status: Status.ACCEPTED,
        comment: 'Great opportunity!',
      });

      const result = await resolver.updateOpportunityStatus(
        '1',
        Status.ACCEPTED,
        'Great opportunity!',
      );
      expect(result).toEqual({
        ...mockGrant,
        status: Status.ACCEPTED,
        comment: 'Great opportunity!',
      });
      expect(grantOpportunityRepo.save).toHaveBeenCalledWith({
        ...mockGrant,
        status: Status.ACCEPTED,
        comment: 'Great opportunity!',
      });
    });

    it('should throw an error if the grant opportunity is not found', async () => {
      grantOpportunityRepo.findOneBy.mockResolvedValue(null);

      await expect(
        resolver.updateOpportunityStatus(
          '1',
          Status.ACCEPTED,
          'Great opportunity!',
        ),
      ).rejects.toThrow('Failed to update status');
    });

    it('should throw an error if there is a failure while updating', async () => {
      grantOpportunityRepo.findOneBy.mockResolvedValue(mockGrant);
      grantOpportunityRepo.save.mockRejectedValue(
        new Error('Failed to update status'),
      );

      await expect(
        resolver.updateOpportunityStatus(
          '1',
          Status.ACCEPTED,
          'Great opportunity!',
        ),
      ).rejects.toThrow('Failed to update status');
    });
  });
});
