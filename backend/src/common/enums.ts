import { registerEnumType } from '@nestjs/graphql';

export enum Status {
   NEW = 'NEW',
   ACCEPTED = 'ACCEPTED',
   REJECTED = 'REJECTED'
}

export enum AreaOfFunding {
  PUBLIC_HEALTH_WOMEN = 'PUBLIC HEALTH WOMEN',
  CULTURE_FOOD = 'CULTURE FOOD',
  MEDICAL_ASSISGTANCE = 'MEDICAL ASSISGTANCE',
  VETERANS_ISSUES = 'VETERANS` ISSUES',
  ENVIROMENT_ART = 'ENVIROMENT ART',
  RELIGIOUS_AND_SPIRITUAL_ENDEAVORS = 'RELIGIOUS & SPIRITUAL ENDEAVORS',
  PUBLIC_HEALTH_MEN = 'PUBLIC HEALTH MEN',
  PUBLIC_HEALTH_CHILD = 'PUBLIC HEALTH CHILD',
  PUBLIC_HEALTH_ADULT = 'PUBLIC HEALTH ADULT',
}

export enum DiverseStatus {
  NEW = 'NEW',
  APPLIED = 'APPLIED',
}

registerEnumType(Status, {
  name: 'Status',
});

registerEnumType(AreaOfFunding, {
  name: 'AreaOfFunding',
});

registerEnumType(DiverseStatus, {
  name: 'DiverseStatus',
});