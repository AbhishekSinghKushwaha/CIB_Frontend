import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewRecipientModalComponent } from './new-recipient-modal.component';
import { NewRecipientService } from 'src/app/core/services/modal-services/new-recipient/new-recipient.service';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CountryModalModule } from '../country-modal/country-modal.module';
import { IntraNewRecipientComponent } from './intra-new-recipient/intra-new-recipient.component';
import { InterNewRecipientComponent } from './inter-new-recipient/inter-new-recipient.component';
import { FormElementsModule } from '../../form-elements/form-elements.module';
import { SubsidiaryModalModule } from '../subsidiary-modal/subsidiary-modal.module';

@NgModule({
  declarations: [
    NewRecipientModalComponent,
    IntraNewRecipientComponent,
    InterNewRecipientComponent,
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
  ],
  providers: [NewRecipientService],
})
export class NewRecipientModalModule {}
