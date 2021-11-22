import { Pipe, PipeTransform } from '@angular/core';
import { BuyGoodsFavouriteModel } from 'src/app/core/domain/buy-goods-favourites.model';

@Pipe({
  name: 'tillNumberSearch'
})
export class TillNumberSearchPipe implements PipeTransform {

  transform(value: BuyGoodsFavouriteModel[], searchValue: string): any {
    if (!searchValue) return value;
    return value.filter((v) =>
      v.accountName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
      v.accountNumber.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}
