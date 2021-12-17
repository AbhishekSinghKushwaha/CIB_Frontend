import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountVeriticalListItemComponent } from './account-veritical-list-item.component';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    AccountVeriticalListItemComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    AccountVeriticalListItemComponent
  ],
})
export class AccountVeriticalListItemModule { }
