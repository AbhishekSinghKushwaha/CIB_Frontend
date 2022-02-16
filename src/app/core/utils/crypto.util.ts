import * as cryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

export class CryptoUtils {

  static encrypt(value: string) {
    const crypted = cryptoJS.AES.encrypt(value, environment.kService);
    return crypted.toString();
  }

  // Decrypt Request
  static decrypt(crypted: string) {
    const kService = environment.kService;
    const decrypted = cryptoJS.AES.decrypt(crypted, kService);
    const result = decrypted.toString(cryptoJS.enc.Utf8);
    return result.toString();
  }

  static b64EncodeData(data: string): string {
    if (environment.production) {
      return btoa(data);
    } else {
      return data;
    }
  }

  static b64DecodeData(data: string): string {
    if (environment.production) {
      return atob(data);
    } else {
      return data;
    }
  }

}
