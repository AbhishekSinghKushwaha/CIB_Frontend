import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankSelectionComponent } from './bank-selection.component';
import { BankSelectionListItemComponent } from '../../components/bank-selection-list-item/bank-selection-list-item.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { BankSelectionService } from 'src/app/core/services/bank-selection/bank-selection.service';
import { BankSearchPipe } from '../../pipes/bank-search/bank-search.pipe';

@NgModule({
  declarations: [
    BankSelectionComponent,
    BankSelectionListItemComponent,
    BankSearchPipe
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule
  ],
  exports: [
    BankSelectionComponent,
    BankSelectionListItemComponent
  ],
  providers:[
    BankSelectionService
  ]
})
export class BankSelectionModule { }
