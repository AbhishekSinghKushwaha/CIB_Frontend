import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TransactionTypeService } from 'src/app/core/services/transaction-type/transaction-type.service';
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: 'app-transaction-type',
  templateUrl: './transaction-type.component.html',
  styleUrls: ['./transaction-type.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransactionTypeComponent),
      multi: true,
    },
  ],
})
export class TransactionTypeComponent implements OnInit {

  transactionTypes: any[];

  @Input()
  parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  @Input() transactionType!: string;

  public value!: any;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor(
    private readonly transactionTypeService: TransactionTypeService
  ) {}

  ngOnInit(): void {
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    this.transactionTypeService.selected.subscribe((response) => {
      this.parentForm.controls.transferType.setValue(response);
    });
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

  openTransactionType() {
    this.transactionTypeService.open(TransactionTypeConstants.TransferType);
  }

}
