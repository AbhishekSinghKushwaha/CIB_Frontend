import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnEquityAccountRoutingModule } from './own-equity-account-routing.module';
import { OwnEquityAccountComponent } from './own-equity-account.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { CurrencySelectionModule } from '../../../../shared/modals/currency-selection/currency-selection.module';
import { SchedulePaymentModule } from '../../../../shared/modals/schedule-payment/schedule-payment.module';
import { SelectAccountModalModule } from './../../../../shared/modals/select-account-modal/select-account-modal.module';
import { SelectAccountSendToModule } from './../../../../shared/modals/select-account-send-to/select-account-send-to.module';
import { SupportingDocumentsUploadModule } from './../../../../shared/modals/supporting-documents-upload/supporting-documents-upload.module';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';

@NgModule({
  declarations: [
    OwnEquityAccountComponent
  ],
  imports: [
    CommonModule,
    OwnEquityAccountRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
    SelectAccountModalModule,
    SelectAccountSendToModule,
    SupportingDocumentsUploadModule
  ],
  providers: [
    CurrencySelectionConstants
  ]
})
export class OwnEquityAccountModule { }
