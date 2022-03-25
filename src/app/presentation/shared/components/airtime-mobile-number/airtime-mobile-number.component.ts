import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AirtimeMobileNumberModel } from 'src/app/core/domain/airtime-mobile-number.model';
import { AirtimeMobileNumberService } from 'src/app/core/services/airtime-mobile-number/airtime-mobile-number.service';
import { InternationalAirtimeAmountRangeService } from 'src/app/core/services/international-airtime-amount-range/international-airtime-amount-range.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { CountryMobileCodeModal } from 'src/app/core/domain/countryCode.model';
import { MobileOperatorsService } from 'src/app/core/services/mobile-operators/mobile-operators.service';
import { NewRecipientService } from 'src/app/core/services/modal-services/new-recipient.service';
import { CountryService } from "src/app/core/services/modal-services/country.service";
import { CountryModel } from "src/app/core/domain/bank.model";

@Component({
  selector: 'app-airtime-mobile-number',
  templateUrl: './airtime-mobile-number.component.html',
  styleUrls: ['./airtime-mobile-number.component.scss']
})
export class AirtimeMobileNumberComponent implements OnInit {

  airtimeMobileNumberForm: FormGroup;
  data: AirtimeMobileNumberModel;
  visibility= true;

  mobileCodes: CountryMobileCodeModal[];
  telco: any;
  country: CountryModel;

  constructor(
    readonly dialogRef: MatDialogRef<AirtimeMobileNumberComponent>,
    private readonly airtimeMobileNumberService: AirtimeMobileNumberService,
    private readonly internationalAirtimeAmountRangeService: InternationalAirtimeAmountRangeService,
    private readonly mobileOperatorsService: MobileOperatorsService,
    private readonly newRecipientService: NewRecipientService,
    private readonly countryService: CountryService,
    private readonly fb: FormBuilder,
  ) { 
    this.data = airtimeMobileNumberService.default;
  }

  ngOnInit(): void {
    this.initForm();
    this.mobileCodes = mockData.mobileCodes;
    this.telco = this.mobileOperatorsService.default;
    this.country = this.countryService.countryData;
  }


  close(): void {
    this.dialogRef.close(true);
  }

  initForm() {
    this.airtimeMobileNumberForm = this.fb.group({
      phoneNumber: ["", [Validators.required]],
    });
  }

  submit() {
    this.airtimeMobileNumberService.set(this.airtimeMobileNumberForm.value);
    const payload = {
      phoneNumber: this.airtimeMobileNumberForm.value.phoneNumber,
      telco: this.telco,
      country: this.country
    }
    this.newRecipientService.set(payload);
    const modal = this.internationalAirtimeAmountRangeService.open(mockData.airtimeAmountRange);
    this.visibility = false;
    modal.afterClosed().subscribe(() => {
      this.visibility = true;
      this.airtimeMobileNumberService.close();
    });
  }

}
