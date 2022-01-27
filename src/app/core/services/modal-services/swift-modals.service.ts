import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SwiftChargesModalComponent } from 'src/app/presentation/shared/modals/swift-charges-modal/swift-charges-modal.component';
import { PaymentCategoryModalComponent } from 'src/app/presentation/shared/modals/payment-category-modal/payment-category-modal.component';
export interface SwiftCharges {}
export interface PaymentCategory {}
@Injectable()
export class SwiftModalsService {
  selectedCharge = new Subject<SwiftCharges>();
  selectedPaymentCategory = new Subject<PaymentCategory>();
  chargesData: SwiftCharges;
  paymentCategoryData: PaymentCategory;
  chargesModalRef: MatDialogRef<SwiftChargesModalComponent, any>;
  paymentCategoryModalRef: MatDialogRef<PaymentCategoryModalComponent, any>;
  constructor(private readonly dialog: MatDialog) {}

  openSwiftCharges() {
    this.chargesModalRef = this.dialog.open<SwiftChargesModalComponent, any>(
      SwiftChargesModalComponent,
      {
        maxWidth: '22vw',
        disableClose: true,
        data: '',
      }
    );
    return this.chargesModalRef;
  }

  get defaultCharge(): SwiftCharges {
    return this.chargesData;
  }

  selectSwiftCharges(charges: SwiftCharges): void {
    this.chargesData = charges;
    this.selectedCharge.next(this.chargesData);
  }

  closeSwiftChargesModal() {
    this.chargesModalRef.close();
  }

  openPaymentCategoryModal() {
    this.paymentCategoryModalRef = this.dialog.open<
      PaymentCategoryModalComponent,
      any
    >(PaymentCategoryModalComponent, {
      maxWidth: '22vw',
      disableClose: true,
      data: '',
    });
    return this.paymentCategoryModalRef;
  }

  get defaultPaymentCategory(): PaymentCategory {
    return this.paymentCategoryData;
  }

  selectPaymentCategory(category: PaymentCategory): void {
    this.paymentCategoryData = category;
    this.selectedPaymentCategory.next(this.paymentCategoryData);
  }

  closePaymentCategoryModal() {
    this.paymentCategoryModalRef.close();
  }
}
