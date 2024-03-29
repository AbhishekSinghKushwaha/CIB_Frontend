import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { CountryModel } from "src/app/core/domain/bank.model";
import { CountryService } from "src/app/core/services/modal-services/country.service";
import { MobileOperatorsService } from "src/app/core/services/mobile-operators/mobile-operators.service";
import { MobileOperatorsConstants } from "src/app/core/utils/constants/mobile-operator.constants";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { NewRecipientService } from "src/app/core/services/modal-services/new-recipient.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { TelcoService } from "src/app/core/services/modal-services/telco.service";

@Component({
  selector: "app-airtime-new-recepient",
  templateUrl: "./airtime-new-recepient.component.html",
  styleUrls: ["./airtime-new-recepient.component.scss"],
})
export class AirtimeNewRecepientComponent implements OnInit {
  selected: any;
  countries: CountryModel[];
  @Input() isChecked: boolean;
  visibility = true;
  airtimeForm: FormGroup;
  telcos: any[];
  transferType = TransactionTypeConstants.TransferType;
  countryCode: any;

  get getFormFields() {
    return this.airtimeForm.controls;
  }

  countriesSubsidiaries: CountryModel[];
  allcountries: CountryModel[];
  allcount: CountryModel[];

  public value: CountryModel;

  constructor(
    readonly dialogRef: MatDialogRef<AirtimeNewRecepientComponent>,
    public readonly data: MobileOperatorsConstants,
    private mobileOperatorsService: MobileOperatorsService,
    private readonly storageService: StorageService,
    private fb: FormBuilder,
    private readonly newRecipientService: NewRecipientService,
    private readonly telcoService: TelcoService,
    private readonly countryService: CountryService
  ) {
    this.selected = this.mobileOperatorsService.default;
    this.mobileOperatorsService.selected.subscribe((x) => (this.selected = x));
    this.countries = this.storageService.getData("countries");
  }

  ngOnInit(): void {
    this.initForm();
    this.countries = this.storageService.getData("countries");
    this.countriesSubsidiaries = this.storageService.getData("subsidiaries");
    this.allcountries = this.countries.filter(
      (country) => country.operatingCountry !== true
    );
  }

  private initForm(): void {
    this.airtimeForm = this.fb.group({
      country: [""],
    });
  }

  public writeValue(value: CountryModel): void {
    this.value = value;
  }

  close(): void {
    this.dialogRef.close(true);
  }

  openCountrySelectionModal() {
    this.countryService
      .openCountry(this.countriesSubsidiaries.concat(this.allcountries), "", {})
      .afterClosed()
      .subscribe((res) => {
        this.value = res;
        this.telcoService.getTelcos(this.value.countryCode).subscribe((res) => {
          if (res.status) {
            this.telcos = res.data;
          }
        });
      });
  }
}
