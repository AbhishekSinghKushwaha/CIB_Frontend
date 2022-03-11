import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirtimeFailedComponent } from './airtime-failed.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { AirtimeFailedService } from 'src/app/core/services/airtime-failed/airtime-failed.service';



@NgModule({
  declarations: [
    AirtimeFailedComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    AirtimeFailedComponent
  ],
  providers: [
    AirtimeFailedService
  ]
})
export class AirtimeFailedModule { }
