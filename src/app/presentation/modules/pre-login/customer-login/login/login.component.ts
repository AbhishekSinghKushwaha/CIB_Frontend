import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationModalService } from 'src/app/core/services/modal-services/notification-modal/notification-modal.service';
import LOGIN_CONSTANTS from 'src/app/core/utils/constants/pre-login.constants';
import { SharedUtils } from '../../../../../core/utils/shared.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginPasswordForm: FormGroup = new FormGroup({});
  hidePassword = true;
  submitted = false;
  isloggedOut = false;

  constructor(
    private readonly notificationModalService: NotificationModalService,
    private readonly authService: AuthService,
    private readonly router: Router,
    public translate: TranslateService
  ) { }

  async ngOnInit(): Promise<void> {
    this.initForm();
  }

  get f(): any {
    return this.loginPasswordForm.controls;
  }

  private async checkLoginStatus(): Promise<void> {
    const user = this.authService
      .getUserData()
      .then((response) => {
        if (response) {
          this.router.navigate(['/dashboard']);
        }
      })
      .catch((e) => console.log(e));
  }

  private initForm(): void {
    this.loginPasswordForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    const payload = {
      ...this.loginPasswordForm.value,
      grant_type: 'password',
      // deepcode ignore HardcodedNonClientId: <please specify a reason of ignoring this>
      client_id: 'onboarding',
      // deepcode ignore HardcodedNonCryptoSecret: <please specify a reason of ignoring this>
      client_secret: 'postman-secret',
      scope: 'offline_access'
    };
    this.authService.clearUserData();
    this.authService.userLogin(payload).subscribe(
      (authData) => {
        console.log(authData);
        try {
          this.authService.setToken(authData);
          this.authService.setLoginState(LOGIN_CONSTANTS.LOGIN_STAGES.SMS_VERIFICATION);
          this.router.navigate(['/auth/login/sms-verification']);
        } catch (error) { console.log('Login error', error) }
      },
      (error) => {
        this.modalTakeAnotherLook();
        console.log({ error });
      }
    );
  }

  // TODO: The modal services here are for examples only. These would be taken out
  modalTakeAnotherLook(): void {
    const message = SharedUtils.getNotificationModalParam({
      image: './assets/images/Illustrations/Illustrations_VerificationCode.svg',
      title: 'Take another look',
      message:
        "The details you entered aren't familiar to us. Please try again or register to create your profile",
      buttonText: 'Try again',
    });
    this.notificationModalService.open(message);
  }
  modalTryAgain(): void {
    const message = SharedUtils.getNotificationModalParam({
      title: 'Lets try this again',
      message:
        "The details you entered aren't familiar to us. Please try again or register to create your profile",
      registerButtonEnabled: true,
      buttonText: 'Try again',
    });
    this.notificationModalService.open(message);
  }

  modalLogout(): void {
    const message = SharedUtils.getNotificationModalParam({
      title: 'Are you sure you want to sign out?',
      message: '',
      logoutButtonEnabled: true,
    });
    this.notificationModalService.open(message);
    this.isloggedOut = true;
  }
  modelSessionOut(): void {
    const message = SharedUtils.getNotificationModalParam({
      image: './assets/images/Illustrations/logout-illustration.svg',
      title: 'Are you stil there?',
      message: `You've been quiet. To keep your details safe, you will be automatically signed out in 00:59 seconds`,
      logoutButtonEnabled: true,
    });
    this.notificationModalService.open(message);
  }
}
