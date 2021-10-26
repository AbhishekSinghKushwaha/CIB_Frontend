import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NewRecipientModalComponent } from './new-recipient-modal.component';
import { NewRecipientService } from 'src/app/core/services/new-recipient/new-recipient.service';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CountryModalModule } from '../country-modal/country-modal.module';



@NgModule({
  declarations: [
    NewRecipientModalComponent
  ],
  exports: [
    NewRecipientModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    ReactiveFormsModule,
    CountryModalModule
  ],
  providers:[
    NewRecipientService
  ]
})
export class NewRecipientModalModule { }
