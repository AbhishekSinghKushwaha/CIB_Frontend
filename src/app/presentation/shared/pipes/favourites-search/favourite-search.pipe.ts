import { Pipe, PipeTransform } from '@angular/core';
import { FavouriteBeneficiaryModel } from 'src/app/core/domain/favourites-beneficiary.model';

@Pipe({
  name: 'favouriteSearch'
})
export class FavouriteSearchPipe implements PipeTransform {

  transform(value: FavouriteBeneficiaryModel[], searchValue: string): FavouriteBeneficiaryModel[] {
    if (!searchValue) return value;
    return value.filter((v) =>
      v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
      v.country.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
      v.channel.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
      v.phoneNumber.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}
