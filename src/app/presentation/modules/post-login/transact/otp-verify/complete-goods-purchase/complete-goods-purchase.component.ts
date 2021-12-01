import { Component, Input, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AddMerchantService } from 'src/app/core/services/add-merchant/add-merchant.service';

@Component({
  selector: 'app-complete-goods-purchase',
  templateUrl: './complete-goods-purchase.component.html',
  styleUrls: ['./complete-goods-purchase.component.scss']
})
export class CompleteGoodsPurchaseComponent implements OnInit {

  visibility = true;

  constructor(
    private router: Router,
    private readonly addMerchantService: AddMerchantService,
    ) { }

  ngOnInit(): void {
  }

  done() {
    this.router.navigate(['/transact'])
  }

  openAddMerchant() {
    this.addMerchantService.open(null);
  }
}
