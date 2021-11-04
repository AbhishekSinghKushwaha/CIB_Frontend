import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FromAccount } from 'src/app/core/domain/transfer.models';

@Component({
  selector: 'app-transfer-to',
  templateUrl: './transfer-to.component.html',
  styleUrls: ['./transfer-to.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(
        () => TransferToComponent
      ),
      multi: true
    }
  ]
})
export class TransferToComponent implements ControlValueAccessor, OnInit {
  destinationAccounts: any[];

  @Input() transactionType: string;

  @Input()
  parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  public value!: FromAccount;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor() { }

  ngOnInit(): void {
  }

  public writeValue(value: any): void {
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

  openTransferToModal() {
    switch (this.transactionType) {
      case 'ownEquityAccount':
        
        break;
    
      default:
        break;
    }
  }

}
