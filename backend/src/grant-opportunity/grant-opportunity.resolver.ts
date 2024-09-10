import { Logger } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { PaginatedGrantOpportunities } from './graphql/PaginatedGrantOpportunities';
import { GrantOpportunity } from '../postgres/pg-models/grant-opportunity.entity';
import { Status, DiverseStatus } from '../common/enums';

@Resolver(() => GrantOpportunity)
export class GrantOpportunityResolver {
  constructor(
    @InjectRepository(GrantOpportunity)
    private grantOpportunityRepo: Repository<GrantOpportunity>,
    private logger: Logger,
  ) {}

  @Query(() => [GrantOpportunity])
  async getNewOpportunities(): Promise<GrantOpportunity[]> {
    try {
      return this.grantOpportunityRepo.find({ where: { status: Status.NEW } });
    } catch (e) {
      this.logger.error(e);
      throw new Error('Failed to get grants with status NEW');
    }
  }

  @Query(() => [GrantOpportunity])
  async getAllOpportunities(): Promise<GrantOpportunity[]> {
    try {
      return this.grantOpportunityRepo.find();
    } catch (e) {
      this.logger.error(e);
      this.logger.error(e);

      throw new Error('Failed to to get all grants');
    }
  }

  @Query(() => PaginatedGrantOpportunities)
  async grants(
    @Args('status', { type: () => DiverseStatus }) status: DiverseStatus,
    @Args('page') page: number = 1,
    @Args('limit') limit: number = 10,
  ): Promise<PaginatedGrantOpportunities> {
    try {
      const statusMap: Map<DiverseStatus, Status[]> = new Map([
        [DiverseStatus.APPLIED, [Status.ACCEPTED, Status.REJECTED]],
        [DiverseStatus.NEW, [Status.NEW]],
      ]);

      const statuses = statusMap.get(status) || [Status.NEW];
      const skip = (page - 1) * limit;

      const [items, totalItems] = await this.grantOpportunityRepo.findAndCount({
        where: { status: In([...statuses]) },
        take: limit,
        skip,
      });

      const totalPages = Math.ceil(totalItems / limit);

      return { items, totalPages };
    } catch (e) {
      this.logger.error(e);
      throw new Error('Failed to to get paginated grants');
    }
  }

  @Mutation(() => GrantOpportunity)
  async updateOpportunityStatus(
    @Args('id') id: string,
    @Args('status', { type: () => Status }) status: Status,
    @Args('comment', { nullable: true }) comment?: string,
  ): Promise<GrantOpportunity> {
    try {
      const opportunity = await this.grantOpportunityRepo.findOneBy({ id });
      if (!opportunity) {
        throw new Error('Failed to update status');
      }

      opportunity.status = status;

      if (comment) {
        opportunity.comment = comment;
      }

      return this.grantOpportunityRepo.save(opportunity);
    } catch (e) {
      this.logger.error(e);
      throw new Error('Failed to update status');
    }
  }
}
