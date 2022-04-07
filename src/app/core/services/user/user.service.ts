import urlList from '../service-list.json';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) { }

  validateUsername(value: string) {
    return this.http.get(`${environment.apiUrl}${urlList.login.validateUser}?email=${value}`);
  }

  resetPassword(data: any) {
    return this.http.post(`${environment.apiUrl}${urlList.login.resetPassword}`, data);
  }

  getLimit(username: string) {
    return this.http.get(`${environment.apiUrl}${urlList.userManagement.getUserLimit}${username}`);
  }

  editLimit(username: string, currencyCode: string, payload: any) {
    return this.http.put(`${environment.apiUrl}${urlList.userManagement.editUserLimit}${username}/${currencyCode}`, payload);
  }

  addLimit(username: string, payload: any) {
    return this.http.post(`${environment.apiUrl}${urlList.userManagement.addUserLimit}${username}`, payload);
  }
}
