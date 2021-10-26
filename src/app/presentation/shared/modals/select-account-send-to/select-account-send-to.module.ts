import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAccountSendToComponent } from './select-account-send-to.component';
import { AccountSendToComponent } from './account-send-to/account-send-to.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { SelectAccountSendtoService } from 'src/app/core/services/select-account-sendto/select-account-sendto.service';


@NgModule({
  declarations: [
    SelectAccountSendToComponent,
    AccountSendToComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
  ],
  exports: [
    SelectAccountSendToComponent,
    AccountSendToComponent
  ],
  providers: [
    SelectAccountSendtoService
  ]
})
export class SelectAccountSendToModule { }
