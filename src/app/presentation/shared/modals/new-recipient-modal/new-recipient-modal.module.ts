import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRecipientModalComponent } from './new-recipient-modal.component';
import { NewRecipientService } from 'src/app/core/services/new-recipient/new-recipient.service';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CountryModalModule } from '../country-modal/country-modal.module';
import { IntraNewRecipientComponent } from './intra-new-recipient/intra-new-recipient.component';
import { InterNewRecipientComponent } from './inter-new-recipient/inter-new-recipient.component';
import { FormElementsModule } from '../../form-elements/form-elements.module';
import { SubsidiaryModalModule } from '../subsidiary-modal/subsidiary-modal.module';
import { AirtimeNewRecepientComponent } from './airtime-new-recepient/airtime-new-recepient.component';
import { MobileOperatorsModule } from 'src/app/presentation/shared/components/mobile-operators/mobile-operators.module';
import { MobileOperatorsConstants } from 'src/app/core/utils/constants/mobile-operator.constants';

@NgModule({
  declarations: [
    NewRecipientModalComponent,
    IntraNewRecipientComponent,
    InterNewRecipientComponent,
    AirtimeNewRecepientComponent,
  ],
  exports: [NewRecipientModalComponent],
  imports: [
    CommonModule,
    MatStyleModule,
    ReactiveFormsModule,
    CountryModalModule,
    SubsidiaryModalModule,
    FormsModule,
    ReactiveFormsModule,
    FormElementsModule,
    MobileOperatorsModule
  ],
  providers: [NewRecipientService, MobileOperatorsConstants],
})
export class NewRecipientModalModule {}
