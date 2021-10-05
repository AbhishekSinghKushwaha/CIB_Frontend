import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationModalService } from 'src/app/core/services/notification-modal/notification-modal.service';
import SharedUtil from './../../../../core/utils/shared.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginPasswordForm: FormGroup=new FormGroup({});
  hidePassword = true;
  submitted = false;
  isloggedOut=false;

  constructor(
    private readonly notificationModalService: NotificationModalService,
    private readonly router: Router) { }

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
    const message = SharedUtil.getNotificationModalParam({
      image: './assets/images/Illustrations/Illustrations_VerificationCode.svg',
      title: 'Take another look',
      message: 'The details you entered aren\'t familiar to us. Please try again or register to create your profile',
    })
    this.notificationModalService.open(message);
  }
  modalTryAgain(): void {
    const message = SharedUtil.getNotificationModalParam({
      title: 'Lets try this again',
      message: 'The details you entered aren\'t familiar to us. Please try again or register to create your profile',
      registerButtonEnabled: true
    })
    this.notificationModalService.open(message);
  }
  modalIncorectVerification(): void {
    const message = SharedUtil.getNotificationModalParam({
      title: 'Incorrect verification code',
      message: 'The details you entered aren\'t familiar to us. Please try again or register to create your profile',
    })
    this.notificationModalService.open(message);
  }

  navigateToForgotPasswordSection(): void {
    this.router.navigate(['forgot-password']);
  }

  modalLogout(): void {
    const message = SharedUtil.getNotificationModalParam({
      title: 'Are you sure you want to sign out?',
      message: '',
      logoutButtonEnabled: true
    })
    this.notificationModalService.open(message);
    this.isloggedOut=true;
  }
  modelSessionOut(): void {
    const message = SharedUtil.getNotificationModalParam({
      image: './assets/images/Illustrations/logout-illustration.svg',
      title: 'Are you stil there?',
      message: `You've been quiet. To keep your details safe, you will be automatically signed out in 00:59 seconds`,
      logoutButtonEnabled: true
    })
    this.notificationModalService.open(message);
  }

  
}
