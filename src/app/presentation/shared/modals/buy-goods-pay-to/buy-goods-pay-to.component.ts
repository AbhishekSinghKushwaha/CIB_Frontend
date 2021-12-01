import { Component, Input, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BuyGoodsPayToService } from 'src/app/core/services/buy-goods-pay-to/buy-goods-pay-to.service';
import { BuyGoodsFavouriteModel } from 'src/app/core/domain/buy-goods-favourites.model';
import { MerchantTillNumberService } from 'src/app/core/services/merchant-till-number/merchant-till-number.service';

@Component({
  selector: 'app-buy-goods-pay-to',
  templateUrl: './buy-goods-pay-to.component.html',
  styleUrls: ['./buy-goods-pay-to.component.scss']
})
export class BuyGoodsPayToComponent implements OnInit {

  @Input() isChecked: boolean;
  selected: BuyGoodsFavouriteModel;
  searchText: string;
  visibility = true;

  constructor(
    readonly dialogRef: MatDialogRef<BuyGoodsPayToComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BuyGoodsFavouriteModel[],
    private readonly buyGoodsPayToService: BuyGoodsPayToService,
    private readonly merchantTillNumberService: MerchantTillNumberService
  ) {
    this.selected = buyGoodsPayToService.default;
    this.buyGoodsPayToService.selected.subscribe((x) => this.selected = x);
   }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

  openMerchantTillNumber(): void {
    const modal = this.merchantTillNumberService.open(null);
    this.visibility = false;
    modal.afterClosed().subscribe(() => {
      this.visibility = true;
    });
  }

}
