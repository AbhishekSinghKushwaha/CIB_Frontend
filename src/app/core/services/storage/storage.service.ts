import { Injectable } from '@angular/core';
import { CryptoUtils } from '../../utils/crypto.util';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() { }

  setData(key: any, data: any): void {
    try {
      const encryption = environment.production ? CryptoUtils.encrypt(JSON.stringify(data)) : JSON.stringify(data);
      sessionStorage.setItem(key, encryption);
    } catch (e) {
      console.error(e);
    }
  }

  getData(key: string) {
    try {
      let result = null;
      const encryption = sessionStorage.getItem(key);
      if (encryption) {
        const data = environment.production ? CryptoUtils.decrypt(encryption) : encryption;
        result = JSON.parse(data)
      }
      return result;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  removeData(key: string): void {
    sessionStorage.removeItem(key);
  }

  clearData(): void {
    return sessionStorage.clear();
  }
}
