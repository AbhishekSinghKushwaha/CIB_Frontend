import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../service-list.json';
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  // Get user accounts
  // getUserAccounts(): Observable<any> {
  //   return this.http.get(environment.apiUrl + urlList.accounts.getUserAccounts);
  // } 
  getUserAccounts(): Observable<any> {
    return of({ "data": [{ "accountName": "JAMES EKAI NATUKOI", "accountNumber": "1100194977404", "accountType": "", "balance": 724979.46, "transactionLimit": 10000.0, "currency": "KES" }], "status": true, "message": "Request was Successful", "responseCode": "00", "response": 1 })
  }

}
