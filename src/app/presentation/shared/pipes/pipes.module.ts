import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankSearchPipe } from './bank-search/bank-search.pipe';
import { FavouritesSearchPipe } from './favourites-search/favourites-search.pipe';
import { TillNumberSearchPipe } from './tillNumber-search/till-number-search.pipe';

@NgModule({
  declarations: [BankSearchPipe, FavouritesSearchPipe, TillNumberSearchPipe],
  imports: [CommonModule],
  exports: [BankSearchPipe, FavouritesSearchPipe, TillNumberSearchPipe],
})
export class PipesModule {}
