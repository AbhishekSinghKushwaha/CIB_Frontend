import { FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/presentation/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup = new FormGroup({});
  @Input() token: string;
  @Input() userIdentifier: string;
  hidePassword1 = true;
  hidePassword2 = true;
  submitted: boolean;
  pattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{12,}$';

  constructor(private readonly userservice: UserService, protected snackbar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    this.initForm();
  }

  get f(): any {
    return this.resetPasswordForm.controls;
  }

  private initForm(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });
  }


  submit() {
    if (this.resetPasswordForm.valid) {
      this.submitted = true;

      const payload = {
        newPassword: this.resetPasswordForm.value.password,
        userIdentifier: this.userIdentifier,
        token: this.token
      }
      this.userservice.resetPassword(payload).subscribe(
        (response) => {
          this.submitted = false;
          this.resetPasswordForm.reset();
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
          this.submitted = false;
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

}
