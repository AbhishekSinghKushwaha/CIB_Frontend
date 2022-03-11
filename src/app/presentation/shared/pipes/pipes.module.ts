import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BankSearchPipe } from "./bank-search/bank-search.pipe";
import { FavouritesSearchPipe } from "./favourites-search/favourites-search.pipe";
import { TillNumberSearchPipe } from "./tillNumber-search/till-number-search.pipe";
import { PaymentCategorySearchPipe } from "./payment-category-search/payment-category-search.pipe";
import { CountrySearchPipe } from "./country-search/country-search.pipe";
import { FormatFileSizePipe } from "./file-size-formatter/file-size-formatter.pipe";
import { TransferTypeLabelPipe } from "./transfer-type/transfer-type.pipe";

@NgModule({
  declarations: [
    BankSearchPipe,
    FavouritesSearchPipe,
    TillNumberSearchPipe,
    PaymentCategorySearchPipe,
    CountrySearchPipe,
    FormatFileSizePipe,
    TransferTypeLabelPipe

  ],
  imports: [CommonModule],
  exports: [
    BankSearchPipe,
    FavouritesSearchPipe,
    TillNumberSearchPipe,
    PaymentCategorySearchPipe,
    CountrySearchPipe,
    FormatFileSizePipe,
    TransferTypeLabelPipe
  ],
})
export class PipesModule {}
