export interface UserModel {
  id?: number;
  name: string;
  email?: string;
  access_token?: string;
  newLogin?: boolean;
  password?: string;
  transactionType?: string;
  response_code?: number;
  family?: string;
  smsToken?: string;
  username?: string;
  securityQuestions: { question: string; answer: string }[];
}
