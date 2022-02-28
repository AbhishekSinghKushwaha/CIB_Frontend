import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import urlList from '../service-list.json';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel } from '../../domain/user.model';
import { SecurityQuestion } from '../../domain/security-question.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityChallengeService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getSecurityQuestions() {
    const url = environment.apiUrl + urlList.login.getSecurityQuestions;
    return this.http
      .get<SecurityQuestion[]>(url);
  }

  getMySecurityQuestions() {
    const url = environment.apiUrl + urlList.login.getMySecurityQuestions;
    return this.http
      .get<SecurityQuestion[]>(url);
  }

  submitSecurityAnswers(answers: any, user: UserModel) {
    const url = environment.apiUrl + urlList.login.securityAnswers;
    return this.http
      .post<any[]>(url, { ...user, answers });
  }
}
