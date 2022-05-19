import { Component, OnInit, Inject } from '@angular/core';
import { AddMerchantService } from 'src/app/core/services/add-merchant/add-merchant.service';
import { MerchantAddedSuccessfulService } from 'src/app/core/services/merchant-added-successful/merchant-added-successful.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-merchant-added-successful',
  templateUrl: './merchant-added-successful.component.html',
  styleUrls: ['./merchant-added-successful.component.scss']
})
export class MerchantAddedSuccessfulComponent implements OnInit {

  constructor(
    readonly dialogRef: MatDialogRef<MerchantAddedSuccessfulComponent>,
    private addMerchantService: AddMerchantService,
    private merchantAddedSuccessfulService: MerchantAddedSuccessfulService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.addMerchantService.close();
    this.merchantAddedSuccessfulService.close();
  }

}
