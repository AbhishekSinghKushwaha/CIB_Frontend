import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import urlList from 'src/app/core/services/service-list.json';

@Injectable({
  providedIn: 'root'
})
export class CorporateService {

  constructor(private http: HttpClient) { }

  getLimit(companyID: string) {
    return this.http.get(`${environment.apiUrl}${urlList.corporate.getTransactionLimit}${companyID}`);
  }

  editLimit(companyID: string, currencyCode: string, payload: any) {
    return this.http.put(`${environment.apiUrl}${urlList.corporate.updateTransactionLimit}${companyID}/${currencyCode}`, payload);
  }

  addLimit(companyID: string, payload: any) {
    return this.http.post(`${environment.apiUrl}${urlList.corporate.addTransactionLimit}${companyID}`, payload);
  }

  getCorporateDetail(corporateEmail: string) {
    return this.http.get(`${environment.apiUrl}${urlList.corporate.main}${corporateEmail}`);
  }

  editUserCountry(corporateId: string, payload: any) {
    return this.http.put(`${environment.apiUrl}${urlList.corporate.corporateUser}${corporateId}/Country`, payload)
  }

  //Otp Access

  sendOtp(platformId: number) {
    return this.http.get(`${environment.apiUrl}${urlList.corporate.sendOtp}?platformId=${platformId}`);
  }

  verifyOtp(otp: string) {
    return this.http.get(`${environment.apiUrl}${urlList.corporate.verifyOtp}?otp=${otp}`);
  }

  updateOtpAcessNotificationSetting(corporateUserId: string, payload: any) {
    return this.http.put(`${environment.apiUrl}${urlList.corporate.updateNotificationOtpAcess}${corporateUserId}/NotificationSettingUseOtp`, payload)
  }

  updateNotificationSetting(corporateUserId: string, payload: any) {
    return this.http.put(`${environment.apiUrl}${urlList.corporate.updateNotificationOtpAcess}${corporateUserId}/NotificationSetting`, payload)
  }


}
