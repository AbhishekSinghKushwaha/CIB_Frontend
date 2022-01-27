import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserVerifyProduct } from 'src/app/core/domain/user-verify-product.model';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import LOGIN_CONSTANTS from 'src/app/core/utils/constants/pre-login.constants';

@Component({
  selector: 'app-security-verification',
  templateUrl: './security-verification.component.html',
  styleUrls: ['./security-verification.component.scss'],
})
export class SecurityVerificationComponent implements OnInit {
  selectedItem!: UserVerifyProduct | null;
  submitted = false;
  userVerifyProducts!: UserVerifyProduct[];

  constructor(
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.userVerifyProducts = [
      { id: 1, name: 'Answer the security answers', icon: 'email' },
      { id: 2, name: 'Contact support', icon: 'pay-card' },
    ];
  }

  toggleProduct(product: UserVerifyProduct): void {
    this.submitted = false;
    if (this.selectedItem?.id === product.id) {
      this.selectedItem = null;
    } else {
      this.selectedItem = product;
    }
  }

  back() {
    this.storageService.setData('loginState', {
      stage: LOGIN_CONSTANTS.LOGIN_STAGES.SMS_VERIFICATION,
    });
    this.router.navigate(['/auth/sms-verification']);
  }

  isChecked(product: UserVerifyProduct): boolean {
    return product.id === this.selectedItem?.id;
  }

  submit() {
    console.log(this.selectedItem);
    if (this.selectedItem?.id === 1) {
      this.storageService.setData('loginState', {
        stage: LOGIN_CONSTANTS.LOGIN_STAGES.SECURITY_CHALLENGE,
      });
      this.router.navigate(['/auth/security-challenge']);
    }
  }
}
