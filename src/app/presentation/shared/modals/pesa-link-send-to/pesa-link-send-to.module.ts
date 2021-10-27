import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesaLinkSendToComponent } from './pesa-link-send-to.component';
import { FormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { PesaLinkSendToService } from 'src/app/core/services/pesa-link-send-to/pesa-link-send-to.service';
import { RecepientBankModalModule } from '../recepient-bank-modal/recepient-bank-modal.module';
import { BeneficiaryListItemModule } from '../../components/beneficiary-list-item/beneficiary-list-item.module';
import { FavouriteSearchModule } from '../../pipes/favourite-search/favourite-search.module';
import { PhoneLinkedModalModule } from '../phone-linked-modal/phone-linked-modal.module';

@NgModule({
  declarations: [
    PesaLinkSendToComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    RecepientBankModalModule,
    BeneficiaryListItemModule,
    FavouriteSearchModule,
    PhoneLinkedModalModule
  ],
  exports: [
    PesaLinkSendToComponent
  ],
  providers: [PesaLinkSendToService]
})
export class PesaLinkSendToModule { }
