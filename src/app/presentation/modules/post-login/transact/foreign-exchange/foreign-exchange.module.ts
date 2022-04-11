import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForeignExchangeRoutingModule } from './foreign-exchange-routing.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { EazzyFxComponent } from './eazzy-fx/eazzy-fx.component';
import { EazzyFxRatesComponent } from './eazzy-fx-rates/eazzy-fx-rates.component';
import { EazzyFxRateComponent } from './eazzy-fx-rate/eazzy-fx-rate.component';
import { EazzyFixRateService } from './services/eazzy-fix-rate.service';
import { EazzyFxPairComponent } from './eazzy-fx-pair/eazzy-fx-pair.component';
import { EazzyFxCurrencyModalComponent } from './eazzy-fx-currency-modal/eazzy-fx-currency-modal.component';
import { EazzyFxCurrencyModalService } from './eazzy-fx-currency-modal/service/eazzy-fx-currency-modal.service';
import { EazzyFxGenerateDealModalComponent } from './eazzy-fx-generate-deal-modal/eazzy-fx-generate-deal-modal.component';
import { EazzyFxGenerateDealModalService } from './eazzy-fx-generate-deal-modal/services/eazzy-fx-generate-deal-modal.service';
import { EazzyFxNegotiateComponent } from './eazzy-fx-negotiate/eazzy-fx-negotiate.component';
import { EazzyFxTransactionTypeModalComponent } from './eazzy-fx-transaction-type-modal/eazzy-fx-transaction-type-modal.component';
import { EazzyFxTransactionTypeModalService } from './eazzy-fx-transaction-type-modal/services/eazzy-fx-transation-type-modal.service';

@NgModule({
  declarations: [
    EazzyFxComponent,
    EazzyFxRatesComponent,
    EazzyFxRateComponent,
    EazzyFxPairComponent,
    EazzyFxCurrencyModalComponent,
    EazzyFxGenerateDealModalComponent,
    EazzyFxNegotiateComponent,
    EazzyFxTransactionTypeModalComponent,
  ],
  imports: [
    CommonModule,
    ForeignExchangeRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    SharedModalsModule,
    FormElementsModule,
  ],
  providers: [
    EazzyFixRateService,
    EazzyFxCurrencyModalService,
    EazzyFxGenerateDealModalService,
    EazzyFxTransactionTypeModalService,
  ],
})
export class ForeignExchangeModule {}
