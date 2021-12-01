import { Component, OnInit, Input } from '@angular/core';
import { BuyGoodsFavouriteModel } from 'src/app/core/domain/buy-goods-favourites.model';
import { BuyGoodsPayToService } from 'src/app/core/services/buy-goods-pay-to/buy-goods-pay-to.service';

@Component({
  selector: 'app-buy-goods-favourites',
  templateUrl: './buy-goods-favourites.component.html',
  styleUrls: ['./buy-goods-favourites.component.scss']
})
export class BuyGoodsFavouritesComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() category = 'manage-favourites';
  @Input() data: BuyGoodsFavouriteModel;
  @Input() showCheckbox = false;

  constructor(
    private readonly buyGoodsPayToService: BuyGoodsPayToService,
  ) { }

  ngOnInit(): void {
  }

  select(): void {
    this.buyGoodsPayToService.select(this.data);
  }


}
