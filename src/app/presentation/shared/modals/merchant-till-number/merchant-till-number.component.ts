import { Component, Input, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { merchantTillNumberModel } from 'src/app/core/domain/merchant-till-number.model';
import { MerchantTillNumberService } from 'src/app/core/services/merchant-till-number/merchant-till-number.service';


@Component({
  selector: 'app-merchant-till-number',
  templateUrl: './merchant-till-number.component.html',
  styleUrls: ['./merchant-till-number.component.scss']
})
export class MerchantTillNumberComponent implements OnInit {

  equityForm: FormGroup;
  data: merchantTillNumberModel;

  constructor(
    readonly dialogRef: MatDialogRef<MerchantTillNumberComponent>,
    private readonly merchantTillNumberService: MerchantTillNumberService,
  ) { 
    this.data = merchantTillNumberService.default;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.equityForm = new FormGroup({
      accountNumber: new FormControl(this.data?.accountNumber, [Validators.required]),
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  submit() {
    this.merchantTillNumberService.set(this.equityForm.value);
    this.merchantTillNumberService.close();
  }
}
