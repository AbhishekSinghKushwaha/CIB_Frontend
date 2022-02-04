import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferToModalComponent } from './transfer-to-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { TransferToService } from 'src/app/core/services/modal-services/transfer-to.service';
import { AccountSendToComponent } from './account-send-to/account-send-to.component';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { SendOrPayToComponent } from './send-or-pay-to/send-or-pay-to.component';
import { PipesModule } from '../../pipes/pipes.module';
import { FormElementsModule } from '../../form-elements/form-elements.module';
import { NewRecipientModalModule } from '../new-recipient-modal/new-recipient-modal.module';

@NgModule({
  declarations: [
    TransferToModalComponent,
    AccountSendToComponent,
    SendOrPayToComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    SharedComponentsModule,
    FormElementsModule,
    PipesModule,
    NewRecipientModalModule,
  ],
  exports: [
    TransferToModalComponent,
    AccountSendToComponent,
    SendOrPayToComponent,
  ],
  providers: [TransferToService],
})
export class TransferToModalModule {}
