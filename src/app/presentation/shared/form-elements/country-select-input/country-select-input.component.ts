import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BankModel, CountryModel } from 'src/app/core/domain/bank.model';
import { CountryService } from 'src/app/core/services/modal-services/country.service';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';

@Component({
  selector: 'app-country-select-input',
  templateUrl: './country-select-input.component.html',
  styleUrls: ['./country-select-input.component.scss'],
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

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor(
    private readonly countryService: CountryService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    this.sharedDataService.countries.subscribe((res) => {
      this.countries = res;
    });
    this.countryService.selectedCountry.subscribe((response) => {
      this.parentForm.controls.country.setValue(response);
    });
  }

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
    this.countryService.openCountry(this.countries, '');
  }
}
