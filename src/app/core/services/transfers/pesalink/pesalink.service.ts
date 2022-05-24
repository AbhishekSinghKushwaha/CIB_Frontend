import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class PesalinkService {

  private dataSource = new BehaviorSubject<string>('service');
  currentData = this.dataSource.asObservable();

  constructor(private http: HttpClient) { }

  pesalinkPayload(payload: any): void {
    this.dataSource.next(payload);
  }

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

  nameEnquiry(bankPayload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.transfers.getAccountDetails, bankPayload);
  }

  phoneAccountsInquiry(phonePayload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.pesalink.phoneAccountsInquiry, phonePayload);
  }

}
