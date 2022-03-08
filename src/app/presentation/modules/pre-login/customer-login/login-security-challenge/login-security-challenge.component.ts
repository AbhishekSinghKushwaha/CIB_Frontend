import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/domain/user.model';
import { SecurityChallengeService } from 'src/app/core/services/security-challenge/security-challenge.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import LOGIN_CONSTANTS from 'src/app/core/utils/constants/pre-login.constants';

@Component({
  selector: 'app-login-security-challenge',
  templateUrl: './login-security-challenge.component.html',
  styleUrls: ['./login-security-challenge.component.scss'],
})
export class LoginSecurityChallengeComponent implements OnInit {
  user: UserModel;

  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router,
    private readonly securityChallengeService: SecurityChallengeService
  ) {
  }

  async ngOnInit(): Promise<void> {
  }

  back() {
    this.storageService.setData('loginState', {
      stage: LOGIN_CONSTANTS.LOGIN_STAGES.SECURITY_VERIFICATION,
    });
    this.router.navigate(['/auth/login/security-verification']);
  }

  submit(answers: any[]): void {
    this.securityChallengeService
      .submitSecurityAnswers(answers)
      .subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.storageService.setData('loginState', {
              stage: LOGIN_CONSTANTS.LOGIN_STAGES.LOGIN_SUCCESS,
            });
            this.router.navigate(['/dashboard']);
          } else {
          }
        },
        (error) => {
          console.log({ error });
        }
      );
  }
}
