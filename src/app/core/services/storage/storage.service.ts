import { Injectable } from '@angular/core';
import { CryptoUtils } from '../../utils/crypto.util';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() { }

  setData(key: any, data: any): void {
    try {
      const encryption = CryptoUtils.encrypt(JSON.stringify(data));
      sessionStorage.setItem(CryptoUtils.b64EncodeData(key), encryption);
    } catch (e) {
      console.error(e);
    }
  }

  getData(key: string) {
    try {
      let result = null;
      const encryption = sessionStorage.getItem(CryptoUtils.b64EncodeData(key));
      if (encryption) {
        result = JSON.parse(CryptoUtils.decrypt(encryption))
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  removeData(key: string): void {
    sessionStorage.removeItem(CryptoUtils.b64EncodeData(key));
  }

  clearData(): void {
    return sessionStorage.clear();
  }
}
