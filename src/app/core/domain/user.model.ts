export interface UserModel {
  id?: number;
  name: string;
  email?: string;
  access_token?: string;
  newLogin?: boolean;
  response_code?: number;
  family: string;
  smsToken?: string;
}
