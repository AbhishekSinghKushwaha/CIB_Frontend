import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { BuyGoodsPayToComponent } from 'src/app/presentation/shared/modals/buy-goods-pay-to/buy-goods-pay-to.component';
import { BuyGoodsFavouriteModel } from 'src/app/core/domain/buy-goods-favourites.model';

@Injectable({
  providedIn: 'root'
})
export class BuyGoodsPayToService {

  
  selected = new Subject<BuyGoodsFavouriteModel>();
  private data:BuyGoodsFavouriteModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: BuyGoodsFavouriteModel[]): void {
    this.dialog.open<BuyGoodsPayToComponent, BuyGoodsFavouriteModel[]>(BuyGoodsPayToComponent, {
      disableClose: true,
      data
    });
  }

  select(account: BuyGoodsFavouriteModel): void {
    this.data = account
    this.selected.next(this.data)
  }

  get default():BuyGoodsFavouriteModel{
    return this.data
  }
}
