import { NgModule } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { StandingOrdersFormRoutingModule } from './standing-orders-form-routing.module';
import { StandingOrdersFormComponent } from './standing-orders-form.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { SelectTransactionTypeModule } from 'src/app/presentation/shared/modals/select-transaction-type/select-transaction-type.module';
import { BuyairtimeAmountModule } from 'src/app/presentation/shared/components/buyairtime-amount/buyairtime-amount.module';
import { TransactionTypeModalModule } from "src/app/presentation/shared/modals/transaction-type-modal/transaction-type-modal.module";
import { MobileWalletsService } from "src/app/core/services/modal-services/mobile-wallets.service";
import { LanguageTranslateModule } from "src/app/translate.module";
import { PipesModule } from "src/app/presentation/shared/pipes/pipes.module";

@NgModule({
  declarations: [
    StandingOrdersFormComponent
  ],
  imports: [
    CommonModule,
    StandingOrdersFormRoutingModule,
    MatStyleModule,
    SharedComponentsModule,
    FormElementsModule,
    SharedModalsModule,
    SelectTransactionTypeModule,
    BuyairtimeAmountModule,
    TransactionTypeModalModule,
    LanguageTranslateModule.forRoot(),
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    StandingOrdersFormComponent
  ],
  providers: [
    MobileWalletsService,
    KeyValuePipe  
  ]
})
export class StandingOrdersFormModule { }
