import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {
    // do nothing
  }

  setLocalData(key: string, data: any): void {
    try {
      localStorage.setItem(this.b64EncodeData(key), this.b64EncodeData(JSON.stringify(data)));
    } catch (e) {
      console.error(e);
    }
  }

  getLocalData(key: string): any {
    try {
      const data = localStorage.getItem(this.b64EncodeData(key));
      if (data) {
        return JSON.parse(this.b64DecodeData(data));
      }
    } catch (e) {
      console.error(e);
    }
  }

  setData(key: any, data: any): void {
    try {
      sessionStorage.setItem(this.b64EncodeData(key), this.b64EncodeData(JSON.stringify(data)));
    } catch (e) {
      console.error(e);
    }
  }

  getData(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const data = sessionStorage.getItem(this.b64EncodeData(key));
        if (data) {
          resolve(JSON.parse(this.b64DecodeData(data)))
        }
      } catch (e) {
        reject(e);
      }
    })

  }

  removeData(key: string): void {
    sessionStorage.removeItem(this.b64EncodeData(key));
  }

  removeLocalData(key: string): void {
    localStorage.removeItem(this.b64EncodeData(key));
  }

  clearData(): void {
    return sessionStorage.clear();
  }

  clearLocalData(): void {
    return localStorage.clear();
  }

  private b64EncodeData(data: string): string {
    if (environment.production) {
      return btoa(data);
    } else {
      return data;
    }
  }

  private b64DecodeData(data: string): string {
    if (environment.production) {
      return atob(data);
    } else {
      return data;
    }
  }
}
