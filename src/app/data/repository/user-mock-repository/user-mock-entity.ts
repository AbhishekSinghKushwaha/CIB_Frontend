export interface UserMockEntity {
  id: number;
  name: string;
  family: 'Father' | 'Mother' | 'Baby';
  access_token: string;
  newLogin: boolean;
  password: string;
  transactionType: string;
  response_code: number;
  smsToken: string;
  username: string;
  securityQuestions: { question: string; answer: string }[];
}
