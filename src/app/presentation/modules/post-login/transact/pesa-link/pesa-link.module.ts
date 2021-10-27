import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PesaLinkRoutingModule } from './pesa-link-routing.module';
import { PesaLinkComponent } from './pesa-link.component';

import { PesaLinkSendToModule } from './../../../../shared/modals/pesa-link-send-to/pesa-link-send-to.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SelectAccountModalModule } from './../../../../shared/modals/select-account-modal/select-account-modal.module';
import { CurrencySelectionModule } from 'src/app/presentation/shared/modals/currency-selection/currency-selection.module';
import { SchedulePaymentModule } from 'src/app/presentation/shared/modals/schedule-payment/schedule-payment.module';


@NgModule({
  declarations: [
    PesaLinkComponent
  ],
  imports: [
    CommonModule,
    PesaLinkRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    ReactiveFormsModule,
    PesaLinkSendToModule,
    SelectAccountModalModule,
    CurrencySelectionModule,
    SchedulePaymentModule
  ]
})
export class PesaLinkModule { }
