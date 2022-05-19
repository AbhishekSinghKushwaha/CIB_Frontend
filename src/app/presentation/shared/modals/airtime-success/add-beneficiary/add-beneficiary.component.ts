import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AddBeneficiaryModel } from 'src/app/core/domain/add-beneficiary.model';
import { AddBeneficiaryService } from 'src/app/core/services/add-beneficiary/add-beneficiary.service';
import { BeneficiaryAddedService } from 'src/app/core/services/beneficiary-added/beneficiary-added.service';
import { BuyAirtimeService } from 'src/app/core/services/transfers/buy-airtime/buy-airtime.service';
import { BeneficiaryManagementService } from "src/app/core/services/beneficiary-management/beneficiary-management.service";

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.component.html',
  styleUrls: ['./add-beneficiary.component.scss']
})
export class AddBeneficiaryComponent implements OnInit {

  equityForm: FormGroup;
  data: AddBeneficiaryModel;
  visibility = true;

  airtimePayload: any;
  constructor(
    readonly dialogRef: MatDialogRef<AddBeneficiaryComponent>,
    private readonly addBeneficiaryService: AddBeneficiaryService,
    private readonly beneficiaryAddedService: BeneficiaryAddedService,
    private readonly buyAirtimeService: BuyAirtimeService,
    private readonly beneficiaryManagementService: BeneficiaryManagementService,
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
    this.addBeneficiaryService.set(this.equityForm.value);

    this.buyAirtimeService.currentData.subscribe(data => {
      this.airtimePayload = data;
    });

    const payload = {
      countryCode: this.airtimePayload.currency,
      bankCode: this.airtimePayload.beneficiaryBankCode,
      fullName: this.equityForm.value.name,
      accountNumber: this.airtimePayload.beneficiaryAccount,
      fromAccount: this.airtimePayload.sourceAccount,
      phoneNumber: this.airtimePayload.beneficiaryAccount,
      transferTypes: this.airtimePayload.transferType,
      isFavourite: true,
      productName: this.airtimePayload.beneficiaryBank
    }
    this.beneficiaryManagementService.submitForm(payload);
    const modal = this.beneficiaryAddedService.open();
    this.visibility = false;
    modal.afterClosed().subscribe(() => {
      this.visibility = true;
    });
  }

}
