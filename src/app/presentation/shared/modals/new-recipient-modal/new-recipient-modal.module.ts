import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRecipientModalComponent } from './new-recipient-modal.component';
import { NewRecipientService } from 'src/app/core/services/modal-services/new-recipient.service';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CountryModalModule } from '../country-modal/country-modal.module';
import { IntraNewRecipientComponent } from './intra-new-recipient/intra-new-recipient.component';
import { InterNewRecipientComponent } from './inter-new-recipient/inter-new-recipient.component';
import { FormElementsModule } from '../../form-elements/form-elements.module';
import { SwiftNewRecipientComponent } from './swift-new-recipient/swift-new-recipient.component';
import { BuyGoodsNewRecipientComponent } from './buy-goods-new-recipient/buy-goods-new-recipient.component';
import { PesalinkNewRecipientComponent } from './pesalink-new-recipient/pesalink-new-recipient.component';
import { MobileMoneyNewRecipientComponent } from './mobile-money-new-recipient/mobile-money-new-recipient.component';
import { BankModalModule } from '../bank-modal/bank-modal.module';
import { MobileOperatorsModalComponent } from './mobile-operators-modal/mobile-operators-modal.component';
import { IntercountryNewRecipientComponent } from './intercountry-new-recipient/intercountry-new-recipient.component';
import { AirtimeNewRecepientComponent } from './airtime-new-recepient/airtime-new-recepient.component';
import { MobileOperatorsModule } from 'src/app/presentation/shared/components/mobile-operators/mobile-operators.module';
import { MobileOperatorsConstants } from 'src/app/core/utils/constants/mobile-operator.constants';
import { TelcoModalModule } from "src/app/presentation/shared/modals/telco-modal/telco-modal.module";

@NgModule({
  declarations: [
    NewRecipientModalComponent,
    IntraNewRecipientComponent,
    InterNewRecipientComponent,
    SwiftNewRecipientComponent,
    BuyGoodsNewRecipientComponent,
    PesalinkNewRecipientComponent,
    MobileMoneyNewRecipientComponent,
    MobileOperatorsModalComponent,
    IntercountryNewRecipientComponent,
    AirtimeNewRecepientComponent
  ],
  exports: [NewRecipientModalComponent],
  imports: [
    CommonModule,
    MatStyleModule,
    CountryModalModule,
    BankModalModule,
    FormElementsModule,
    MobileOperatorsModule,
    TelcoModalModule
  ],
  providers: [NewRecipientService, MobileOperatorsConstants],
})
export class NewRecipientModalModule {}
