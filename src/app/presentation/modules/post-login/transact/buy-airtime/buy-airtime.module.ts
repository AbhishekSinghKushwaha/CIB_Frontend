import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyAirtimeRoutingModule } from './buy-airtime-routing.module';
import { BuyAirtimeComponent } from './buy-airtime.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';

// import { MatStyleModule } from 'src/app/mat-style.module';
// import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
// import { CurrencySelectionModule } from '../../../../shared/modals/currency-selection/currency-selection.module';
// import { SchedulePaymentModule } from '../../../../shared/modals/schedule-payment/schedule-payment.module';
// import { SelectAccountModalModule } from './../../../../shared/modals/select-account-modal/select-account-modal.module';
// import { SelectAccountSendToModule } from './../../../../shared/modals/select-account-send-to/select-account-send-to.module';
// import { SupportingDocumentsUploadModule } from './../../../../shared/modals/supporting-documents-upload/supporting-documents-upload.module';
// import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
// import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';
// import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
// import { ReactiveFormsModule } from '@angular/forms';
// import { ConfirmPaymentModule } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.module';
// // import { FavouritesModalModule } from 'src/app/presentation/shared/modals/favourites-modal/favourites-modal.module';
import { BuyairtimeAmountModule } from 'src/app/presentation/shared/components/buyairtime-amount/buyairtime-amount.module';


@NgModule({
  declarations: [
    BuyAirtimeComponent
  ],
  imports: [
    CommonModule,
    BuyAirtimeRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    SharedModalsModule,
    FormElementsModule,
    BuyairtimeAmountModule
  ],
  // providers: [
  //   CurrencySelectionConstants,
  //   SelectAccountConstants,
  // ]
})
export class BuyAirtimeModule { }
