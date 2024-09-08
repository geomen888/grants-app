import { ObjectType, Field, Int } from '@nestjs/graphql';
import { GrantOpportunity } from '../../postgres/pg-models/grant-opportunity.entity';

@ObjectType()
export class PaginatedGrantOpportunities {
  @Field(() => [GrantOpportunity])
  items: GrantOpportunity[];

  @Field(() => Int)
  totalPages: number;
}
