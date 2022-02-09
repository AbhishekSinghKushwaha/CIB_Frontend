export interface accountOption {}

export interface CorporateVerify {
  accountNumber?: string;
  registrationNumber?: string;
}

export interface companyDetails {
  registrationNumber?: string;
  companyName?: string;
  countryId?: string;
  phoneNumber?: string;
  emailAddress?: string;
  address?: string;
}

export interface Director {
  referenceId?: string;
  emailAddress?: string;
  phoneNumber?: string;
  name?: string;
  officePhoneNumber?: string;
}

export interface Role {
  id?: string;
  description?: string;
  permissions: Permission[];
}

export interface Permission {
  id?: string;
  permissionClaim?: string;
  description?: string;
}

export interface TeamMember {
  emailAddress?: string;
  phoneNumber?: string;
  name?: string;
  idNumber?: string;
  officePhoneNumber?: string;
  roles: Role[];
  transactionLimit?: string;
  corporateUserId?: string;
}
