import { Component, OnInit } from '@angular/core';
import { IUserVerifyProduct } from './../../../../core/interfaces/user-verify-product.interface';

@Component({
  selector: 'app-security-verification',
  templateUrl: './security-verification.component.html',
  styleUrls: ['./security-verification.component.scss']
})
export class SecurityVerificationComponent implements OnInit {
  selectedItem!: IUserVerifyProduct | null;
  submitted = false;
  userVerifyProducts!: IUserVerifyProduct[];

  constructor() { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.userVerifyProducts = [
      {id:1, name: 'Answer the security answers', icon: 'email' },
      {id:2, name: 'Contact support', icon: 'pay-card' },
    ];
  }

  toggleProduct(product: IUserVerifyProduct): void {
    this.submitted = false;
    if (this.selectedItem?.id === product.id) {
      this.selectedItem = null;
    } else {
      this.selectedItem = product;
    }
  }

  isChecked(product: IUserVerifyProduct): boolean {
    return product.id === this.selectedItem?.id;
  }

}
