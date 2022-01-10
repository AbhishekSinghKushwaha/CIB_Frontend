import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationModalService } from 'src/app/core/services/notification-modal/notification-modal.service';
import { ValidateCredentialsUsecase } from 'src/app/core/usecases/validate-credentials.usecase';
import { SharedUtils } from 'src/app/core/utils/shared.util';

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
    private router: Router,
    private readonly notificationModalService: NotificationModalService
  ) { }

  ngOnInit(): void { }

  validateCredentials(): void {
    if (this.credentialsForm.invalid) {
      return;
    }

    const credentials = this.credentialsControls['credentials'].value;

    this.validateCredentialsUsecase.execute(credentials).subscribe(
      (valid: boolean) => {
        if (valid) {
          // navigate to next step
        } else {
          this.showInvalidCredentialsNotification();
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
}
