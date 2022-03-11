import { Component, forwardRef, Inject, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryModel } from 'src/app/core/domain/bank.model';
import { recipientModel } from 'src/app/core/domain/recipient.model';
import { CountryService } from 'src/app/core/services/modal-services/country.service';
import { MobileOperatorsService } from 'src/app/core/services/mobile-operators/mobile-operators.service';
import { countrySettings } from 'src/app/core/utils/constants/country.settings';
import { MobileOperatorsConstants } from 'src/app/core/utils/constants/mobile-operator.constants';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { AirtimeMobileNumberService } from 'src/app/core/services/airtime-mobile-number/airtime-mobile-number.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { StorageService } from "src/app/core/services/storage/storage.service";
import { Subject, Subscription } from "rxjs";

@Component({
  selector: 'app-airtime-new-recepient',
  templateUrl: './airtime-new-recepient.component.html',
  styleUrls: ['./airtime-new-recepient.component.scss']
})
export class AirtimeNewRecepientComponent implements OnInit {

  selected: any;
  airTimeForm: FormGroup;
  country: CountryModel;
  countries: CountryModel[];
  countrySelectType = countrySettings.viewTypes.FLAG_AND_NAME;
  @Input() isChecked: boolean;
  visibility = true;
  @Input() category: string;
  @Output() selectedCountry = new Subject<CountryModel>();
  subscriptions: Subscription[] = [];

  constructor(
    readonly dialogRef: MatDialogRef<AirtimeNewRecepientComponent>,
    public readonly data: MobileOperatorsConstants,
    private readonly countryService: CountryService,
    private mobileOperatorsService: MobileOperatorsService,
    private readonly airtimeMobileNumberService: AirtimeMobileNumberService,
    private readonly storageService: StorageService,
  ) {
    this.selected = this.mobileOperatorsService.default;
    this.mobileOperatorsService.selected.subscribe((x) => (this.selected = x));  
    this.countries = this.storageService.getData("countries");  
  }

  ngOnInit(): void {
    this.listenToDataStreams();
  }

  openCountries(): void {
    const modal = this.countryService.openCountry(
      this.countries,
      this.category,
      {}
    );
    this.subscriptions.push(
      modal.afterClosed().subscribe((data: CountryModel) => {
        this.countryService.openedStatus.next(false);
        this.selectedCountry.next(data);
      })
    );
  }

  listenToDataStreams() {
    this.countryService.selectedCountry.subscribe((x) => (this.country = x));
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
