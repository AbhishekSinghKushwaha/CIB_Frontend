import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TillNumberSearchPipe } from './till-number-search.pipe';


@NgModule({
  declarations: [
    TillNumberSearchPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TillNumberSearchPipe
  ]
})
export class TillNumberSearchModule { }
