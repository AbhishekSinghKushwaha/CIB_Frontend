import { Location } from '@angular/common';
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
import { CONFIRMATIONCOMPLETION } from 'src/app/core/utils/constants/confirmation.constants';
import SharedUtils from 'src/app/core/utils/shared.util';
import { SnackbarComponent } from 'src/app/presentation/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({});

  hidePassword1 = true;
  hidePassword2 = true;
  hidePassword=true;
  private _submitted: boolean;
  otpError: boolean;
  initialResponse="";
  stage: string;

  completionData = CONFIRMATIONCOMPLETION.changePasswordData;
  
  get submitted(): boolean {
    return this._submitted;
  }
  pattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$';

  constructor(private readonly userService: UserService, protected snackbar: MatSnackBar, protected authService: AuthService, private location:Location) { }

  async ngOnInit(): Promise<void> {
    this.initForm();
  }

  get f(): any {
    return this.changePasswordForm.controls;
  }

  private initForm(): void {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });
  }


  submit() {
  
   

  }
  validateSendOpt(): void {
  // for OTP generation
  if (this.changePasswordForm.valid) {
    this.userService.sendOTPChangePassword().subscribe(
      (response: any) => {
        this.stage = 'sms-verification';
        this.initialResponse = response.statusMessage;

      },
      (error) => {
        this.otpError = true;
       
      }
    );


  }
   
  }
  confirmationDone(data: boolean) {}
  onPasswordChangeSubmit(payload: any) {


    this.userService.changePassword({ ...payload }).subscribe(
      (response) => {
        //this.passwordChangeSubmitStatus = false;
        this.stage = 'change-password';
      
      },
      (error) => {
       // this.passwordChangeSubmitStatus = false;
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

  smsVerificationSubmit(otp: string) {
    this.otpError = false;
   const formInputs= this.changePasswordForm.value;
    if (otp) {
const payload={
  oldPassword:formInputs.currentPassword,
  otp,
  newPassword:formInputs.password

}
     this.onPasswordChangeSubmit(payload)
    }
  }
  resetStage(){
    if (!this.stage) {
this.location.back()
    } else {
      this.stage = '';
    }
  }
 
}
