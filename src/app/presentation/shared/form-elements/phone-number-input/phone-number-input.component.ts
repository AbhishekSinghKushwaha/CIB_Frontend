import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CountryModel } from 'src/app/core/domain/bank.model';

@Component({
  selector: 'app-phone-number-input',
  templateUrl: './phone-number-input.component.html',
  styleUrls: ['./phone-number-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberInputComponent),
      multi: true,
    },
  ],
})
export class PhoneNumberInputComponent implements OnInit {
  @Input() parentForm: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public label!: string;

  public value: string;

  @Input()
  placeholder!: string;

  country: CountryModel;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  constructor() {}

  ngOnInit(): void {}

  public writeValue(value: string): void {
    this.value = value;
  }

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
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

  openDialCodeModal() {}
}
