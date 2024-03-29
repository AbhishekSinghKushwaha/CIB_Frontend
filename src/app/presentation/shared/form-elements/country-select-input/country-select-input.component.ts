import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { BankModel, CountryModel } from "src/app/core/domain/bank.model";
import { CountryService } from "src/app/core/services/modal-services/country.service";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-country-select-input",
  templateUrl: "./country-select-input.component.html",
  styleUrls: ["./country-select-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CountrySelectInputComponent),
      multi: true,
    },
  ],
})
export class CountrySelectInputComponent implements OnInit {
  countries: CountryModel[];

  // category =

  @Input()
  parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  @Input() transactionType!: string;

  public value!: CountryModel;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  transferType = TransactionTypeConstants.TransferType;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor(
    private readonly countryService: CountryService,
    private sharedDataService: SharedDataService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {}

  public writeValue(value: CountryModel): void {
    this.value = value;
  }

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }

  public registerOnChange(fn: any): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  openCountrySelectionModal() {
    let countries = [];
    this.transactionType === this.transferType.SUBSIDIARY
      ? (countries = this.storageService
          .getData("countries")
          .filter((v: any) => {
            return v.operatingCountry === true;
          }))
      : (countries = this.storageService.getData("countries"));
    this.countryService
      .openCountry(countries, "", {})
      .afterClosed()
      .subscribe((res) => {
        this.parentForm.controls.country.setValue(res);
      });
  }
}
