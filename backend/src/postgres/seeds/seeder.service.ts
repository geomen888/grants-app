import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GrantOpportunity } from '../pg-models/grant-opportunity.entity';
import { data } from './mock-data';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(GrantOpportunity)
    private readonly grantOpportunityRepo: Repository<GrantOpportunity>,
    private logger: Logger,
  ) {}

  async seed(limit: number): Promise<void> {
    try {
      const existingGrants = await this.grantOpportunityRepo.find();
      if (existingGrants.length) {
        console.log('Grants already exist, skipping seeding');
        return;
      }

      const mockData = data.slice(0, limit);

      await this.grantOpportunityRepo.save(mockData);
      console.log('Database seeding completed successfully.');
    } catch (e) {
      this.logger.error(e);
    }
  }
}
