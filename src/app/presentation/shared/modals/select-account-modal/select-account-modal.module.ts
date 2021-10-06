import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAccountModalComponent } from './select-account-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { AccountDropdownItemComponent } from './account-dropdown-item/account-dropdown-item.component';



@NgModule({
  declarations: [
    SelectAccountModalComponent,
    AccountDropdownItemComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    SharedComponentsModule,
    MatStyleModule
  ],
  exports: [
    SelectAccountModalComponent
  ],
  providers: [
    SelectAccountModalService
  ]
})
export class SelectAccountModalModule { }
