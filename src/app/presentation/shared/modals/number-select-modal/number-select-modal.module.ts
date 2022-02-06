import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberSelectModalComponent } from './number-select-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NumberSelectModalService } from 'src/app/core/services/number-select-modal/number-select-modal.service';



@NgModule({
  declarations: [
    NumberSelectModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  providers: [NumberSelectModalService]
})
export class NumberSelectModalModule { }
