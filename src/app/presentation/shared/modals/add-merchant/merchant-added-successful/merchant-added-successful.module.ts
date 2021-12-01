import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantAddedSuccessfulComponent } from './merchant-added-successful.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MerchantAddedSuccessfulService } from 'src/app/core/services/merchant-added-successful/merchant-added-successful.service';


@NgModule({
  declarations: [
    MerchantAddedSuccessfulComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MerchantAddedSuccessfulComponent
  ],
  providers: [
    MerchantAddedSuccessfulService
  ]
})
export class MerchantAddedSuccessfulModule { }
