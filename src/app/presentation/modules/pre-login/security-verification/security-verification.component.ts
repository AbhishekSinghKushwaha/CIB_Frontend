import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserVerifyProduct } from './../../../../core/domain/user-verify-product.model';

@Component({
  selector: 'app-security-verification',
  templateUrl: './security-verification.component.html',
  styleUrls: ['./security-verification.component.scss']
})
export class SecurityVerificationComponent implements OnInit {
  selectedItem!: UserVerifyProduct | null;
  submitted = false;
  userVerifyProducts!: UserVerifyProduct[];

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.getProducts()
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
    if (this.selectedItem?.id === 1) {
      this.router.navigate(['/auth/security-challenge']);
    }
  }

  isChecked(product: UserVerifyProduct): boolean {
    return product.id === this.selectedItem?.id;
  }

}
