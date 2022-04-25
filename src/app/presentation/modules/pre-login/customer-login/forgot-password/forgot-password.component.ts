import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserVerifyProduct } from 'src/app/core/domain/user-verify-product.model';
import { UserModel } from 'src/app/core/domain/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationModalService } from 'src/app/core/services/modal-services/notification-modal/notification-modal.service';
import { SecurityChallengeService } from 'src/app/core/services/security-challenge/security-challenge.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { ValidateCredentialsUsecase } from 'src/app/core/usecases/validate-credentials.usecase';
import { SharedUtils } from 'src/app/core/utils/shared.util';
import { SnackbarComponent } from 'src/app/presentation/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  otpError: boolean;
  stage: string;
  user: UserModel;
  securityToken: string;
  submitted: boolean;
  initialResponse: string;
  passwordChangeSubmitStatus: boolean;

  credentialsForm: FormGroup = new FormGroup({
    credentials: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private readonly storageService: StorageService,
    private readonly notificationModalService: NotificationModalService,
    private readonly authService: AuthService,
    private readonly securityChallengeService: SecurityChallengeService,
    protected snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.user = this.storageService.getData('loginCred');
  }

  validateCredentials(): void {
    this.submitted = true;
    if (this.credentialsForm.invalid) {
      return;
    }

    const credential = this.credentialsControls.credentials.value;

    this.userService.validateUsername(credential).subscribe(
      (response: any) => {
        this.submitted = false;
        this.stage = 'sms-verification';
        this.initialResponse = response.statusMessage;
      },
      (error) => {
        this.otpError = true;
        this.submitted = false;
        this.showInvalidCredentialsNotification();
      }
    );
  }

  get credentialsControls(): any {
    return this.credentialsForm.controls;
  }

  private showInvalidCredentialsNotification(): void {
    const message = SharedUtils.getNotificationModalParam({
      image: './assets/images/Illustrations/Illustrations_VerificationCode.svg',
      title: 'Let’s try this again',
      message:
        "The details you entered aren't familiar to us. Please try again or register to create your profile.",
      registerButtonEnabled: true,
    });

    this.notificationModalService.open(message);
  }

  smsVerificationSubmit(otp: string) {
    this.otpError = false;
    if (otp) {
      this.authService
        .submitForgetPasswordOTP(otp, this.credentialsControls.credentials.value)
        .forgotPassword
        .subscribe(
          (response) => {
            this.stage = 'security-verification';
          },
          (error) => {
            this.otpError = true;
            console.log({ error });
          }
        );
    }
  }

  resetStage() {
    if (!this.stage) {
      this.router.navigate(['/auth/login']);
    } else {
      this.stage = '';
    }
  }

  onSecurityVerificationSubmit(selectedItem: UserVerifyProduct) {
    if (selectedItem) {
      this.stage = 'security-challenge';
    }
  }

  onSecurityVerificationError(error: boolean) {
    if (error) {
      this.stage = 'security-verification';
    }
  }

  securityChallengeSubmit(answers: any) {
    const result = { ...answers, userIdentifier: this.credentialsControls.credentials.value };
    console.log(result);
    this.securityChallengeService.submitSecurityAnswers(result)
      .subscribe(
        (response) => {
          if (response && response?.token) {
            this.securityToken = response.token;
            this.stage = 'change-password';
          }
        },
        (error) => {
          console.log({ error });
        }
      );
  }

  onPasswordChangeSubmit(payload: any) {
    this.userService.resetPassword({ ...payload, token: this.securityToken }).subscribe(
      (response) => {
        this.passwordChangeSubmitStatus = false;
        const message = {
          error: false,
          errorStatus: '',
          message: 'Your password has been reset successfully',
          details: 'Your password has been reset successfully'
        }
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: message,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
        });
      },
      (error) => {
        this.passwordChangeSubmitStatus = false;
        const errorMessage = { error: true, errorStatus: `${error.status}`, message: error.error.message, details: error.error }
        this.snackbar.openFromComponent(SnackbarComponent, {
          data: errorMessage,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
        });
      }
    );
  }
}
