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

}
