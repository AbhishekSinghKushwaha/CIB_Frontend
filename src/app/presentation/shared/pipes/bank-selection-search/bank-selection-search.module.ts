import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankSelectionSearchPipe } from './bank-selection-search.pipe';



@NgModule({
  declarations: [
    BankSelectionSearchPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BankSelectionSearchPipe
  ]
})
export class BankSelectionSearchModule { }
