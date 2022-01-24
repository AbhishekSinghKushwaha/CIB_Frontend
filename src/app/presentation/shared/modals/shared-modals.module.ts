import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferFromModalModule } from './transfer-from-modal/transfer-from-modal.module';
import { TransferToModalModule } from './transfer-to-modal/transfer-to-modal.module';
import { CurrencySelectionModule } from './currency-selection/currency-selection.module';
import { SchedulePaymentModule } from './schedule-payment/schedule-payment.module';
import { ConfirmPaymentModule } from './confirm-payment/confirm-payment.module';
import { SupportingDocumentsUploadModule } from './supporting-documents-upload/supporting-documents-upload.module';
import { SwiftChargesModalModule } from './swift-charges-modal/swift-charges-modal.module';
import { PaymentCategoryModalModule } from './payment-category-modal/payment-category-modal.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TransferFromModalModule,
    TransferToModalModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
    ConfirmPaymentModule,
    SupportingDocumentsUploadModule,
    SwiftChargesModalModule,
    PaymentCategoryModalModule,
  ],
  exports: [
    TransferFromModalModule,
    TransferToModalModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
    ConfirmPaymentModule,
    SupportingDocumentsUploadModule,
    SwiftChargesModalModule,
    PaymentCategoryModalModule,
  ],
  providers: [],
})
export class SharedModalsModule {}
