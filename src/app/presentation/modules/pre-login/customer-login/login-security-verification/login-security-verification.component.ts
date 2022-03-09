import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserVerifyProduct } from 'src/app/core/domain/user-verify-product.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import LOGIN_CONSTANTS from 'src/app/core/utils/constants/pre-login.constants';

@Component({
  selector: 'app-login-security-verification',
  templateUrl: './login-security-verification.component.html',
  styleUrls: ['./login-security-verification.component.scss'],
})
export class LoginSecurityVerificationComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) { }

  ngOnInit(): void { }

  onSubmit(selectedItem: UserVerifyProduct) {
    if (selectedItem?.id === 1) {
      this.storageService.setData('loginState', {
        stage: LOGIN_CONSTANTS.LOGIN_STAGES.SECURITY_CHALLENGE,
      });
      this.router.navigate(['/auth/login/security-challenge']);
    }
  }

  back() {
    this.storageService.setData('loginState', {
      stage: LOGIN_CONSTANTS.LOGIN_STAGES.SMS_VERIFICATION,
    });
    this.router.navigate(['/auth/login/sms-verification']);
  }
}
