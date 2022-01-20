import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyGoodsRoutingModule } from './buy-goods-routing.module';
import { BuyGoodsComponent } from './buy-goods.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { CurrencySelectionModule } from '../../../../shared/modals/currency-selection/currency-selection.module';
import { SchedulePaymentModule } from '../../../../shared/modals/schedule-payment/schedule-payment.module';
import { SelectAccountSendToModule } from './../../../../shared/modals/select-account-send-to/select-account-send-to.module';
import { SupportingDocumentsUploadModule } from './../../../../shared/modals/supporting-documents-upload/supporting-documents-upload.module';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmPaymentModule } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.module';
import { FavouritesModalModule } from 'src/app/presentation/shared/modals/favourites-modal/favourites-modal.module';
import { BuyGoodsPayToModule } from '../../../../shared/modals/buy-goods-pay-to/buy-goods-pay-to.module';

@NgModule({
  declarations: [BuyGoodsComponent],
  imports: [
    CommonModule,
    BuyGoodsRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
    SelectAccountSendToModule,
    SupportingDocumentsUploadModule,
    FormElementsModule,
    ReactiveFormsModule,
    ConfirmPaymentModule,
    FavouritesModalModule,
    BuyGoodsPayToModule,
  ],
  providers: [CurrencySelectionConstants, SelectAccountConstants],
})
export class BuyGoodsModule {}
