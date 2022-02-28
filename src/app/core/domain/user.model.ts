import { SecurityQuestion } from "./security-question.model";

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
