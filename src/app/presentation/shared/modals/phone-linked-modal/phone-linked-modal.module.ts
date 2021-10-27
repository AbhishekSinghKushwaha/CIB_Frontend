import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneLinkedModalComponent } from './phone-linked-modal.component';
import { MatStyleModule } from './../../../../mat-style.module';
import { PhoneLinkedService } from 'src/app/core/services/phone-linked/phone-linked.service';
import { BankSelectionModule } from '../bank-selection/bank-selection.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PhoneLinkedModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    BankSelectionModule
  ],
  exports: [
    PhoneLinkedModalComponent
  ],
  providers: [PhoneLinkedService]
})
export class PhoneLinkedModalModule { }
