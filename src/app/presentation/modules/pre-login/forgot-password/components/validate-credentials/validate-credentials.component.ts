import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateCredentialsUsecase } from 'src/app/core/usecases/validate-credentials.usecase';

@Component({
  selector: 'app-validate-credentials',
  templateUrl: './validate-credentials.component.html',
  styleUrls: ['./validate-credentials.component.scss'],
})
export class ValidateCredentialsComponent implements OnInit {
  credentialsForm: FormGroup = new FormGroup({
    credentials: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  constructor(
    private validateCredentialsUsecase: ValidateCredentialsUsecase,
    private router: Router
  ) {}

  ngOnInit(): void {}

  validateCredentials(): void {
    if (this.credentialsForm.invalid) {
      return;
    }

    const credentials = this.credentialsForm.get('credentials')?.value;
    this.validateCredentialsUsecase.execute(credentials).subscribe(
      (valid: boolean) => {
        if (valid) {
          // navigate to next step
        } else {
          // show "invalid credentials" notification
        }
      },
      (error: any) => {
        // handle error
      }
    );
  }

  get credentialsControls(): any {
    return this.credentialsForm.controls;
  }
}
