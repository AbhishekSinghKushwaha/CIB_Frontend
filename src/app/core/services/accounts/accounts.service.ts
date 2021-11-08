import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../service-list.json';
@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  // Get user accounts
  getUserAccounts(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.accounts.getUserAccounts);
  }

}
