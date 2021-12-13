import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualAccountRoutingModule } from './virtual-account-routing.module';
import { VirtualAccountComponent } from './virtual-account.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { AccountVeriticalListItemModule } from 'src/app/presentation/shared/components/account-veritical-list-item/account-veritical-list-item.module';


@NgModule({
  declarations: [
    VirtualAccountComponent
  ],
  imports: [
    CommonModule,
    VirtualAccountRoutingModule,
    MatStyleModule,
    AccountVeriticalListItemModule
  ]
})
export class VirtualAccountModule { }
