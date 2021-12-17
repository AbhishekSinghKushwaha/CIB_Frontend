import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddAccountRoutingModule } from './add-account-routing.module';
import { AddAccountComponent } from './add-account.component';
import { AccountCardModule } from 'src/app/presentation/shared/components/account-card/account-card.module';
import { AccountConstants } from 'src/app/core/utils/constants/account.constants';


@NgModule({
  declarations: [
    AddAccountComponent
  ],
  imports: [
    CommonModule,
    AddAccountRoutingModule,
    AccountCardModule
  ],
  providers: [
    AccountConstants
  ]
})
export class AddAccountModule { }
