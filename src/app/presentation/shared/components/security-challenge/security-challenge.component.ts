import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/domain/user.model';
import { SecurityChallengeService } from 'src/app/core/services/security-challenge/security-challenge.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import LOGIN_CONSTANTS from 'src/app/core/utils/constants/pre-login.constants';
import { SecurityQuestionModel } from 'src/app/core/domain/security-question.model';

@Component({
  selector: 'app-security-challenge',
  templateUrl: './security-challenge.component.html',
  styleUrls: ['./security-challenge.component.scss']
})
export class SecurityChallengeComponent implements OnInit {
  @Output() onSubmit = new Subject<any>();
  @Input() title: { main: string, description: string };
  securityChallengeForm: FormGroup = new FormGroup({});
  allSecurityQuestions: SecurityQuestionModel[] = [];
  displayedSecurityQuestions: SecurityQuestionModel[] = [];
  // mySecurityQuestions: SecurityQuestion[];
  submitted = false;
  user: UserModel;
  @Output() error = new Subject<boolean>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly securityChallengeService: SecurityChallengeService
  ) {
    this.initOtpForm();
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.storageService.getData('loginCred');
    this.securityChallengeService.getSecurityQuestions().subscribe(
      (response) => {
        this.allSecurityQuestions = response;
        this.displayedSecurityQuestions = [response[0], response[1]]
        this.initForm();
      },
      (error) => {
        this.error.next(true);
      }
    );

    // this.securityChallengeService.getMySecurityQuestions().subscribe(
    //   (response) => {
    //     this.mySecurityQuestions = response;
    //   },
    //   (error) => {
    //     this.error.next(true);
    //   }
    // );
  }

  get f(): any {
    return this.securityChallengeFormArray.controls;
  }

  get securityChallengeFormArray(): FormArray {
    return this.securityChallengeForm.get('questions') as FormArray;
  }

  initOtpForm(): void {
    this.securityChallengeForm = this.fb.group({
      questions: this.fb.array([]),
    });
  }

  initForm(): void {
    for (let i = 0; i < this.displayedSecurityQuestions.length; i++) {
      this.securityChallengeFormArray.push(
        this.fb.control(null, Validators.required)
      );
    }
  }


  submit(): void {
    const answers = this.securityChallengeFormArray.getRawValue();
    if (answers?.length === this.displayedSecurityQuestions.length) {
      const payload = {
        userQuestionsDtos: this.displayedSecurityQuestions.map((x, i) => ({ questionId: x.id, answer: answers[i] }))
      };
      this.onSubmit.next(payload);
    }
  }

  openQuestions(selected: SecurityQuestionModel, index: number) {
    this.securityChallengeService
      .open(this.allSecurityQuestions, this.displayedSecurityQuestions, selected)
      .afterClosed()
      .subscribe(response => {
        if (response.length) {
          this.displayedSecurityQuestions = response;
        }
      })
  }
}
