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
  securityQuestions: { question: string; answer: string }[];
}
