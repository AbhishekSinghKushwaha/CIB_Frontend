import { Component, Inject, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubsidiaryModel } from 'src/app/core/domain/bank.model';
import { CountryModel } from 'src/app/core/domain/country.model';
import { recipientModel } from 'src/app/core/domain/recipient.model';
import { CountryService } from 'src/app/core/services/country/country.service';
import { MobileOperatorsService } from 'src/app/core/services/mobile-operators/mobile-operators.service';
import { countrySettings } from 'src/app/core/utils/constants/country.settings';
import { BaseTransactComponent } from 'src/app/presentation/modules/post-login/transact/base-transact.component';
import { MobileOperatorsConstants } from 'src/app/core/utils/constants/mobile-operator.constants';
import { Subscription, Subject } from 'rxjs';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { AirtimeMobileNumberService } from 'src/app/core/services/airtime-mobile-number/airtime-mobile-number.service';

@Component({
  selector: 'app-airtime-new-recepient',
  templateUrl: './airtime-new-recepient.component.html',
  styleUrls: ['./airtime-new-recepient.component.scss']
})
export class AirtimeNewRecepientComponent extends BaseTransactComponent implements OnInit {

  selected: any;
  airTimeForm: FormGroup;
  country: CountryModel;
  countrySelectType = countrySettings.viewTypes.FLAG_AND_NAME;
  @Input() isChecked: boolean;
  visibility = true;
  subsidiaries: SubsidiaryModel[];
  viewTypes = countrySettings.viewTypes;
  subscriptions: Subscription[] = [];
  @Input() category: string;
  @Output() selectedCountry = new Subject<SubsidiaryModel>();

  constructor(
    private dialog: MatDialog,
    readonly dialogRef: MatDialogRef<AirtimeNewRecepientComponent>,
    public readonly data: MobileOperatorsConstants,
    private readonly countryService: CountryService,
    private snackBar: MatSnackBar,
    private mobileOperatorsService: MobileOperatorsService,
    private sharedDataService: SharedDataService,
    private readonly airtimeMobileNumberService: AirtimeMobileNumberService,
  ) {
    super(snackBar);
    this.selected = this.mobileOperatorsService.default;
    this.mobileOperatorsService.selected.subscribe((x) => (this.selected = x));    
  }

  ngOnInit(): void {
    this.sharedDataService.subsidiaries.subscribe((res) => {
      console.log(res);
      this.subsidiaries = res;
    });
  }

  openSubsidiaries(): void {
    this.visibility = false;
    const modal = this.countryService.openSubsidiary(
      this.subsidiaries,
      this.category
    );
    this.subscriptions.push(
      modal.afterClosed().subscribe((data: SubsidiaryModel) => {
        this.countryService.openedStatus.next(false);
        this.visibility = true;
        this.selectedCountry.next(data);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.length &&
      this.subscriptions.forEach((value) => value && value.unsubscribe());
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
