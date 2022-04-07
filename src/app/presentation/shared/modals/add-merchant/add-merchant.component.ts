import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AddMerchantModel } from 'src/app/core/domain/add-merchant.model';
import { AddMerchantService } from 'src/app/core/services/add-merchant/add-merchant.service';
import { MerchantAddedSuccessfulService } from 'src/app/core/services/merchant-added-successful/merchant-added-successful.service';
import { BuyGoodsService } from 'src/app/core/services/transfers/buy-goods/buy-goods.service';

@Component({
  selector: 'app-add-merchant',
  templateUrl: './add-merchant.component.html',
  styleUrls: ['./add-merchant.component.scss']
})
export class AddMerchantComponent implements OnInit {

  equityForm: FormGroup;
  data: AddMerchantModel;
  visibility = true;
  payload: any;

  constructor(
    readonly dialogRef: MatDialogRef<AddMerchantComponent>,
    private readonly addMerchantService: AddMerchantService,
    private readonly merchantAddedSuccessfulService: MerchantAddedSuccessfulService,
    private readonly buyGoodsService: BuyGoodsService,
    @Inject(MAT_DIALOG_DATA) public type: any
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.equityForm = new FormGroup({
      name: new FormControl(this.data?.name, [Validators.required]),
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  submit(): void {
    this.addMerchantService.set(this.equityForm.value);
    this.buyGoodsService.currentTillNUmber.subscribe(data => {
      this.payload = data;
      if(data){
        this.buyGoodsService.getFavouriteMerchantDetails(this.payload.tillNumber).subscribe(res => {
          if(res.status){
            const modal = this.merchantAddedSuccessfulService.open(null);
            this.visibility = false;
            modal.afterClosed().subscribe(() => {
              this.visibility = true;
            });
          }
        });
      }
    });
  }

  beneficiarySubmit(){
    console.log(this.equityForm.value);
    const modal = this.merchantAddedSuccessfulService.open(this.type);
    this.visibility = false;
    modal.afterClosed().subscribe(() => {
      this.visibility = true;
    });
  }

}
