import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../../service-list.json';
@Injectable({
  providedIn: 'root'
})
export class OwnAccountService {

  constructor(private http: HttpClient) { }

  sendToOwnEquityAccount(payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.transfers.sendOwnEquityAccount, payload);
  }
}
