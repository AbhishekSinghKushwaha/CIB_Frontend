import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantTillNumberComponent } from './merchant-till-number.component';
import { MatStyleModule } from './../../../../mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MerchantTillNumberService } from 'src/app/core/services/merchant-till-number/merchant-till-number.service';


@NgModule({
  declarations: [
    MerchantTillNumberComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MerchantTillNumberComponent
  ],
  providers: [MerchantTillNumberService]
})
export class MerchantTillNumberModule { }
