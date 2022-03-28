import { Pipe, PipeTransform } from "@angular/core";
import { FavouriteBeneficiaryModel } from "src/app/core/domain/favourites-beneficiary.model";

@Pipe({
  name: "favouriteSearch",
})
export class FavouritesSearchPipe implements PipeTransform {
  transform(value: any[], searchValue: string): any[] {
    if (!searchValue) return value;
    return value.filter(
      (v) =>
        v.fullName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
        v.bank?.bankName.toLowerCase().indexOf(searchValue.toLowerCase()) >
          -1 ||
        v.accountNumber.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
        v.phoneNumber.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  }
}
