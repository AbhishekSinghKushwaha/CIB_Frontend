import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationModalService } from 'src/app/core/services/notification-modal/notification-modal.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginPasswordForm: FormGroup;
  hidePassword = true;
  submitted = false;

  constructor(
    private readonly notificationModalService: NotificationModalService) { }

  ngOnInit(): void {
    this.initForm();
  }

  get f(): any {
    return this.loginPasswordForm.controls;
  }

  private initForm(): void {
    this.loginPasswordForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    console.log('Submitted');
  }

  // TODO: The modal services here are for examples only. These would be taken out
  modalTakeAnotherLook(): void {
    this.notificationModalService.open({
      image: './assets/images/Illustrations/Illustrations_VerificationCode.svg',
      title: 'Take another look',
      message: 'The details you entered aren\'t familiar to us. Please try again or register to create your profile',
      registerButtonEnabled: false
    });
  }
  modalTryAgain(): void {
    this.notificationModalService.open({
      title: 'Lets try this again',
      message: 'The details you entered aren\'t familiar to us. Please try again or register to create your profile',
      registerButtonEnabled: true
    });
  }
  modalIncorectVerification(): void {
    this.notificationModalService.open({
      title: 'Incorrect verification code',
      message: 'The details you entered aren\'t familiar to us. Please try again or register to create your profile',
      registerButtonEnabled: false
    });
  }
}
