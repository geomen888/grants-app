import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrantOpportunityResolver } from './grant-opportunity.resolver';
import { GrantOpportunity } from '../postgres/pg-models/grant-opportunity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrantOpportunity])],
  providers: [GrantOpportunityResolver],
})
export class GrantOpportunityModule {}
