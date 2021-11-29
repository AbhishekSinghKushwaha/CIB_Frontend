import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './statement.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SchedulePaymentModule } from 'src/app/presentation/shared/modals/schedule-payment/schedule-payment.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { StatementOptionModalModule } from 'src/app/presentation/shared/modals/statement-option-modal/statement-option-modal.module';
import { StatementService } from 'src/app/core/services/statement/statement.service';


@NgModule({
  declarations: [
    StatementComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    ReactiveFormsModule,
    StatementRoutingModule,
    FormElementsModule,
    SchedulePaymentModule,
    FormsModule,
    SharedModalsModule,
    StatementOptionModalModule
  ],
  providers: [StatementService]
})
export class StatementModule { }
