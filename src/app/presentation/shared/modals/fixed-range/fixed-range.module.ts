import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FixedRangeComponent } from './fixed-range.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FixedRangeService } from 'src/app/core/services/fixed-range/fixed-range.service';
import { FixedRangeListModule } from 'src/app/presentation/shared/components/fixed-range-list/fixed-range-list.module';

@NgModule({
  declarations: [
    FixedRangeComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FixedRangeListModule
  ],
  exports:[
    FixedRangeComponent
  ],
  providers:[
    FixedRangeService
  ]
})
export class FixedRangeModule { }
