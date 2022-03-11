import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileOperatorsComponent } from './mobile-operators.component';
import { MatStyleModule } from 'src/app/mat-style.module'
import { AirtimeMobileNumberModule } from '../airtime-mobile-number/airtime-mobile-number.module';

@NgModule({
  declarations: [
    MobileOperatorsComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    AirtimeMobileNumberModule
  ],
  exports: [
    MobileOperatorsComponent
  ]
})
export class MobileOperatorsModule { }
