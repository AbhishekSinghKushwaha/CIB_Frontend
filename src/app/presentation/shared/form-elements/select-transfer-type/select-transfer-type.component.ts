import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TransferTypeModalService } from "src/app/core/services/transaction-type-modal/transaction-type-modal.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-select-transfer-type",
  templateUrl: "./select-transfer-type.component.html",
  styleUrls: ["./select-transfer-type.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectTransferTypeComponent),
      multi: true,
    },
  ],
})
export class SelectTransferTypeComponent implements OnInit {
  transferTypes: any[];

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
    private readonly transferTypeModalService: TransferTypeModalService
  ) {}

  ngOnInit(): void {
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    this.transferTypeModalService.selected.subscribe((response) => {
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

  openTransactionTYpeModal() {
    this.transferTypeModalService.open(TransactionTypeConstants.TransferType);
  }
}
