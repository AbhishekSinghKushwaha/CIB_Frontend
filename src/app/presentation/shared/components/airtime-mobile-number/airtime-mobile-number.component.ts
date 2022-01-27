import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AirtimeMobileNumberModel } from 'src/app/core/domain/airtime-mobile-number.model';
import { AirtimeMobileNumberService } from 'src/app/core/services/airtime-mobile-number/airtime-mobile-number.service';
import { InternationalAirtimeAmountRangeService } from 'src/app/core/services/international-airtime-amount-range/international-airtime-amount-range.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { CountryMobileCodeModal } from 'src/app/core/domain/countryCode.model';

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

  constructor(
    readonly dialogRef: MatDialogRef<AirtimeMobileNumberComponent>,
    private readonly airtimeMobileNumberService: AirtimeMobileNumberService,
    private readonly internationalAirtimeAmountRangeService: InternationalAirtimeAmountRangeService
  ) { 
    this.data = airtimeMobileNumberService.default;
  }

  ngOnInit(): void {
    this.initForm();
    this.mobileCodes = mockData.mobileCodes;
  }


  close(): void {
    this.dialogRef.close(true);
  }

  initForm() {
    this.airtimeMobileNumberForm = new FormGroup({
      phoneNumber: new FormControl(this.data?.mobileNumber, [Validators.required]),
    });
  }

  submit() {
    this.airtimeMobileNumberService.set(this.airtimeMobileNumberForm.value);

    const modal = this.internationalAirtimeAmountRangeService.open(mockData.airtimeAmountRange);
    this.visibility = false;
    modal.afterClosed().subscribe(() => {
      this.visibility = true;
      this.airtimeMobileNumberService.close();
    });
  }

}
