
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { DbPgModule } from './postgres/db-pg.module';
import { ConfigsModule } from './common/config.module';
import { GrantOpportunityModule } from './grant-opportunity/grant-opportunity.module';
import { SeederService } from './postgres/seeds/seeder.service';
import { GrantOpportunity } from './postgres/pg-models/grant-opportunity.entity';

@Module({
  imports: [
    ConfigsModule,
    DbPgModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forFeature([GrantOpportunity]),
    GrantOpportunityModule,
  ],
  providers: [SeederService],
})
export class AppModule {}