import { BillerListItemComponent } from './../../components/biller-list-item/biller-list-item.component';
import { BillersService } from 'src/app/core/services/modal-services/billers.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillersModalComponent } from './billers-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    PipesModule
  ],
  declarations: [BillersModalComponent, BillerListItemComponent],
  exports: [BillersModalComponent],
  providers: [BillersService]
})
export class BillersModalModule { }
