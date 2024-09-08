
export enum Status {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export enum DiverseStatus {
  NEW = 'NEW',
  APPLIED = 'APPLIED',
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

export interface Grant {
  id: string;
  title: string;
  avgAmount: number;
  companyName: string;
  comment?: string;
  matchDate: string;
  deadLineDate: string;
  status: Status;
}