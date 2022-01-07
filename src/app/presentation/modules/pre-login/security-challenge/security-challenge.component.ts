import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/domain/user.model';
import { SecurityChallengeService } from 'src/app/core/services/security-challenge/security-challenge.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import LOGIN_CONSTANTS from 'src/app/core/utils/constants/pre-login.constants';

@Component({
  selector: 'app-security-challenge',
  templateUrl: './security-challenge.component.html',
  styleUrls: ['./security-challenge.component.scss']
})
export class SecurityChallengeComponent implements OnInit {
  securityChallengeForm: FormGroup = new FormGroup({});
  securityQuestions: string[] = [
    'What village were you born in?',
    'What was the last city you visited?',
    'At what age did you start working'
  ];
  submitted = false;
  user: UserModel;

  constructor(private readonly fb: FormBuilder,
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly securityChallengeService: SecurityChallengeService) {
    this.initOtpForm();
  }

  async ngOnInit(): Promise<void> {
    this.user = await this.storageService.getData('loginCred');
    this.securityChallengeService.getSecurityQuestions(this.user).subscribe(
      response => {
        this.securityQuestions = response;
      },
      error => {
        console.log({ error });
      }
    )
    this.initForm()
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
    for (let i = 0; i < this.securityQuestions.length; i++) {
      this.securityChallengeFormArray.push(
        this.fb.control(null, Validators.required)
      );
    }
  }

  submit(): void {
    const answers = this.securityChallengeFormArray.getRawValue();
    if (answers?.length === this.securityQuestions.length) {
      this.securityChallengeService.submitSecurityAnswers(answers, this.user).subscribe(
        response => {
          console.log(response);
          if (response) {
            this.storageService.setData('loginState', { stage: LOGIN_CONSTANTS.LOGIN_STAGES.LOGIN_SUCCESS });
            this.router.navigate(['/dashboard']);
          } else {

          }
        },
        error => {
          console.log({ error });
        }
      )
    }
  }

}
