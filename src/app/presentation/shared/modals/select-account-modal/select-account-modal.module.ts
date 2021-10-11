import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAccountModalComponent } from './select-account-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { AccountDropdownItemComponent } from './account-dropdown-item/account-dropdown-item.component';



@NgModule({
  imports: [
    CommonModule,
    MatStyleModule,
  ],
  exports: [
    SelectAccountModalComponent,
    AccountDropdownItemComponent
  ],
  declarations: [
    SelectAccountModalComponent,
    AccountDropdownItemComponent
  ],
  providers: [
    SelectAccountModalService
  ]
})
export class SelectAccountModalModule { }
