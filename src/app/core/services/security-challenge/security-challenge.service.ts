import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import urlList from '../service-list.json';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel } from '../../domain/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityChallengeService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getSecurityQuestions(user: UserModel) {
    const url = environment.apiUrl + urlList.login.securityQuestions;
    return this.http
      .post<any[]>(url, user);
  }

  submitSecurityAnswers(answers: any, user: UserModel) {
    const url = environment.apiUrl + urlList.login.securityAnswers;
    return this.http
      .post<any[]>(url, { ...user, answers });
  }
}
