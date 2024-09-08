import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Status, AreaOfFunding } from '../../common/enums';

@ObjectType({ description: 'grantOpportunity'})
@Entity()
export class GrantOpportunity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ nullable: false })
  title: string;

  @Field(() => String)
  @Column({ nullable: false })
  location: string;

  @Field(() => Number)
  @Column()
  avgAmount: number;

  @Field(() => String)
  @Column()
  deadLineDate: string;

  @Field(() => String)
  @Column({ nullable: false })
  companyName: string;

  @Field(() => String)
  @Column()
  matchDate: string;

  @Field(() => String)
  @Column({ nullable: false })
  description: string;

  @Field(() => Status)
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NEW,
   })
   status: Status;

   @Field(() => [AreaOfFunding])
   @Column({
     type: 'enum',
     array: true,
     enum: AreaOfFunding,
     default: [],
    })
    areaOfFunding: AreaOfFunding[]; 

  @Field({ nullable: true })
  @Column({ nullable: true })
  comment: string;
}
