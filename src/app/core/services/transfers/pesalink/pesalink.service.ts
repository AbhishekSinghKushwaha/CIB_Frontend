import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class PesalinkService {

  constructor(private http: HttpClient) { }

  sendViaPesalink(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.pesalinkTransfer,
      payload
    );
  }

  getTransferCharges(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.getTransferCharges,
      payload
    );
  }

  nameCheck(bankPayload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.pesalink.nameCheck, bankPayload);
  }

  phoneAccountsInquiry(phonePayload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.pesalink.phoneAccountsInquiry, phonePayload);
  }

}
