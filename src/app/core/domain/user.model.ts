export interface UserModel {
  id: number;
  name: string;
  access_token: string;
  newLogin: boolean;
  password: string;
  transactionType: string;
  response_code: number;
  family: 'Father' | 'Mother' | 'Baby';
  smsToken: string;
  username: string;
}


export interface UserListModel {
  idNumber: string;
  name: string;
  userName: string;
  firstName: string;
  lastName: string;
  statusName: string;
  profileType: string;
  status: string;
  lastViewed: string;
}

export interface UserFormPropModel {
  addRoleLink: string;
  userListLink: string;
  username: string;
  addProductLink?: string;
}

export interface LoggedinUserModel {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  corporateId: string;
  firstTimeLogin: boolean;
  userName: string;
  userId: string;
  phoneNumber: string;
  idNumber: string;
  status: boolean;
  statusName: string;
}


export interface UserRole {
  id?: string;
  permissions: UserPermission[];
  roleName?: string;
}

export interface UserPermission {
  id?: string;
  name?: string;
  claim?: string;
  description?: string;
}

export interface UserProduct {
  id: string;
  productGroupId: string;
  name?: string;
  description?: string;
  subProducts: UserSubProduct[];
}
export interface UserSubProduct {
  id?: string;
  productId: string;
  name?: string;
  description?: string;
}

export interface UserLimitModel {
  currencyCode: string;
  dailyLimit: number
  monthlyLimit: number
  transactionLimit: number
  weeklyLimit: number
}