import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedRangeListComponent } from './fixed-range-list.component';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    FixedRangeListComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports:[
    FixedRangeListComponent
  ]
})
export class FixedRangeListModule { }
