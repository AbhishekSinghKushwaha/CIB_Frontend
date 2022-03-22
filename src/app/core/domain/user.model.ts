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
  id: string;
  name: string;
  profileType: string;
  status: string;
  lastViewed: string;
}

export interface UserFormPropModel {
  addRoleLink: string;
  userListLink: string;
  memberId: string;
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