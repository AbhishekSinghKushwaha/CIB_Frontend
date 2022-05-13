import { AfterViewInit, Component, forwardRef, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { CountryModel } from "src/app/core/domain/bank.model";
import { CountryService } from "src/app/core/services/modal-services/country.service";
import { NewRecipientService } from "src/app/core/services/modal-services/new-recipient.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { countrySettings } from "src/app/core/utils/constants/country.settings";
import { mockData } from "src/app/core/utils/constants/mockdata.constants";

@Component({
  selector: "app-phone-number-input",
  templateUrl: "./phone-number-input.component.html",
  styleUrls: ["./phone-number-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberInputComponent),
      multi: true,
    },
  ],
})
export class PhoneNumberInputComponent implements OnInit, AfterViewInit {
  @Input() parentForm: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public label!: string;

  @Input()
  public phoneValue: string;

  public value: any;

  @Input()
  placeholder!: string;

  _selectedCountry: CountryModel;

  @Input() set selectedCountry(data: CountryModel) {
    if (data) {
      // do something
      this.country = data;

      this.formField.setValue(this.formField.value);
    }
  }

  country!: CountryModel;

  phoneNumberEntered = new Subject<number>();

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  constructor(
    private countryService: CountryService,
    private newRecipientService: NewRecipientService,
    private storageService: StorageService
  ) { }


  ngOnInit(): void {
    this.listenToDataStreams();

  }

  ngAfterViewInit(): void {
    if (this.phoneValue) {
      this.value = this.phoneValue
      this.phoneNumberEntered.next(Number(this.value))
    }
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.phoneNumberEntered.next(Number(value));
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

  openDialCodeModal() {
    this.countryService
      .openCountry(
        this.storageService.getData("countries"),
        countrySettings.viewTypes.NAME_ONLY,
        {}
      )
      .afterClosed()
      .subscribe((res) => {
        this.country = res;

        this.country?.dialCode &&
          this.changed(this.country?.dialCode + this.value);
      });
  }

  onPhoneNumberEntered() {
    this.phoneNumberEntered
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((res) => {
        this.value = res.toString();
        this.changed((this.country?.dialCode || "") + this.value);
      });
  }

  listenToDataStreams() {
    // this.countryService.selectedCountry.subscribe((x) => {
    //   this.country = x;
    // });

    this.onPhoneNumberEntered();
  }
}
