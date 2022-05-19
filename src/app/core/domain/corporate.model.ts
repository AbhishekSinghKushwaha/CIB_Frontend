import { Director, Product, TeamMember } from "./customer-onboarding.model";
import { UserLimitModel } from "./user.model";

export interface CorporateModel {
  id: string;
  address: string;
  corporateId: string;
  corporateName: string;
  corporateUsers: TeamMember[];
  countryId: string;
  defaultCorporateAccount: string;
  directors: Director[]
  emailAddress: string;
  phoneNumber: string;
  products: Product[];
  registrationNumber: string;
}

export interface CorporateLimitModel extends UserLimitModel { }
