import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-transaction-limit',
  templateUrl: './transaction-limit.component.html',
  styleUrls: ['./transaction-limit.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransactionLimitComponent),
      multi: true,
    },
  ],
})
export class TransactionLimitComponent implements ControlValueAccessor, OnInit {
  @Input()
  public parentForm!: FormGroup;

  @Input()
  public fieldName: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  public value!: string;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor() { }

  ngOnInit(): void { }

  public writeValue(value: string): void {
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
}
