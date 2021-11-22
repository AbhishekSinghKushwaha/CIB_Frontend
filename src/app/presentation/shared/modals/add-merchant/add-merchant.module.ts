import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMerchantComponent } from './add-merchant.component';
import { MatStyleModule } from './../../../../mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMerchantService } from 'src/app/core/services/add-merchant/add-merchant.service';
import { MerchantAddedSuccessfulModule } from './merchant-added-successful/merchant-added-successful.module';

@NgModule({
  declarations: [
    AddMerchantComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    MerchantAddedSuccessfulModule
  ],
  exports: [
    AddMerchantComponent
  ],
  providers: [
    AddMerchantService
  ]
})
export class AddMerchantModule { }
