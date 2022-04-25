export interface TokenResponseModel {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  firstTimeLogin: boolean;
  name: string;
  tokenExpirationDate: Date;
  username: string;
  message: string;
}
