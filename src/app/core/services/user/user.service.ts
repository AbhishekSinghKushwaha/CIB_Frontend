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
    return this.http.get(`${environment.apiUrl}${urlList.login.initiatePasswordReset}?email=${value}`);
  }

  initiateUsernameReset(value: string) {
    return this.http.get(`${environment.apiUrl}${urlList.login.initiateUsernameReset}?email=${value}`);
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

  updateUserDetails(payload: any) {
    return this.http.put(`${environment.apiUrl}${urlList.userManagement.updateUserDetails
      }`, payload);
  }

  addLimit(username: string, payload: any) {
    return this.http.post(`${environment.apiUrl}${urlList.userManagement.addUserLimit}${username}`, payload);
  }

  getUserCorporateDetail(corporateID: string) {
    return this.http.get(`${environment.apiUrl}${urlList.customerOnboarding.getRegistrationSummary}${corporateID}`);
  }

  getCurrencies() {
    return this.http.get(`${environment.apiUrl}${urlList.userManagement.getCurrencies
      }`);
  }
  getDateFormats() {
    return this.http.get(`${environment.apiUrl}${urlList.userManagement.getDateFormats
      }`);
  }
  getFontSizes() {
    return this.http.get(`${environment.apiUrl}${urlList.userManagement.getFontSizes
      }`);
  }
  getLanguages() {
    return this.http.get(`${environment.apiUrl}${urlList.userManagement.getLanguages
      }`);
  }
  getTimezones() {
    return this.http.get(`${environment.apiUrl}${urlList.userManagement.getTimezones
      }`);
  }
}
