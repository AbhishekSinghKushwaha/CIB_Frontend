import { FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserService } from 'src/app/core/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/presentation/shared/components/snackbar/snackbar.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup = new FormGroup({});
  @Input() userIdentifier: string;
  @Output() onSubmit = new Subject();
  hidePassword1 = true;
  hidePassword2 = true;
  private _submitted: boolean;
  @Input() set submitted(value) {
    value && this.resetPasswordForm.reset();
  }
  get submitted(): boolean {
    return this._submitted;
  }
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
      const payload: { newPassword: string, userIdentifier: string, token?: string } = {
        newPassword: this.f.password.value,
        userIdentifier: this.userIdentifier
      }
      this.submitted = true;
      this.onSubmit.next(payload);
    }


  }

}
