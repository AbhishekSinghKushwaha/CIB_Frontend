import { Component, OnInit } from '@angular/core';
import { AddMerchantService } from 'src/app/core/services/add-merchant/add-merchant.service';
import { MerchantAddedSuccessfulService } from 'src/app/core/services/merchant-added-successful/merchant-added-successful.service';
 
@Component({
  selector: 'app-merchant-added-successful',
  templateUrl: './merchant-added-successful.component.html',
  styleUrls: ['./merchant-added-successful.component.scss']
})
export class MerchantAddedSuccessfulComponent implements OnInit {

  constructor(
    private addMerchantService: AddMerchantService,
    private merchantAddedSuccessfulService: MerchantAddedSuccessfulService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.addMerchantService.close();
    this.merchantAddedSuccessfulService.close();
  }

}
