import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import urlList from '../service-list.json';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel } from '../../domain/user.model';
import { SecurityQuestionModel } from '../../domain/security-question.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SecurityQuestionsModalComponent } from 'src/app/presentation/shared/modals/security-questions-modal/security-questions-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SecurityChallengeService {
  modalRef: MatDialogRef<SecurityQuestionsModalComponent, any>;
  selected: SecurityQuestionModel[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private readonly dialog: MatDialog) { }

  getSecurityQuestions() {
    const url = environment.apiUrl + urlList.login.getSecurityQuestions;
    return this.http
      .get<SecurityQuestionModel[]>(url);
  }

  getMySecurityQuestions() {
    const url = environment.apiUrl + urlList.login.getMySecurityQuestions;
    return this.http
      .get<SecurityQuestionModel[]>(url);
  }

  submitSecurityAnswers(answers: any) {
    const url = environment.apiUrl + urlList.login.securityAnswers;
    return this.http
      .post<{ message: string, token: string }>(url, answers);
  }

  open(allQuestions: SecurityQuestionModel[], displayedQuestions: SecurityQuestionModel[], toUpdate: SecurityQuestionModel) {
    this.modalRef = this.dialog.open<SecurityQuestionsModalComponent, any>(
      SecurityQuestionsModalComponent,
      {
        maxWidth: '30vw',
        disableClose: true,
        data: { allQuestions, displayedQuestions, toUpdate },
      }
    );
    return this.modalRef;
  }

  close(data: SecurityQuestionModel[]): void {
    this.modalRef.close(data);
  }

  set(language: SecurityQuestionModel): void {
  }

}
