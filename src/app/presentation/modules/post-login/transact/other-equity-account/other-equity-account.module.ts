import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherEquityAccountRoutingModule } from './other-equity-account-routing.module';
import { OtherEquityAccountComponent } from './other-equity-account.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SelectAccountModalModule } from './../../../../shared/modals/select-account-modal/select-account-modal.module';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';


@NgModule({
  declarations: [
    OtherEquityAccountComponent
  ],
  imports: [
    CommonModule,
    OtherEquityAccountRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    SelectAccountModalModule
  ],
  providers: [
    SelectAccountModalService
  ]
})
export class OtherEquityAccountModule { }
