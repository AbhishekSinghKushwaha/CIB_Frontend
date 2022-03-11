import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Telco } from "src/app/core/domain/transfer.models";
import { TelcoService } from "src/app/core/services/modal-services/telco.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { TransferTypeModalService } from "src/app/core/services/transaction-type-modal/transaction-type-modal.service";
import {
  TransactionTypeConstants,
  TransferType,
} from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-select-telco",
  templateUrl: "./select-telco.component.html",
  styleUrls: ["./select-telco.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectTelcoComponent),
      multi: true,
    },
  ],
})
export class SelectTelcoComponent implements OnInit {
  telcos: any[];

  @Input()
  parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  @Input() transactionType!: string;

  public value!: Telco;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  transferType = TransactionTypeConstants.TransferType;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor(
    private readonly telcoService: TelcoService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    this.telcoService.selectedTelco$.subscribe((response) => {
      this.parentForm.controls.telco.setValue(response);
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

  openTelcoModal() {
    this.telcoService.openTelcoModal(this.storageService.getData("telcos"));

    this.telcoService.telcoModalRef.afterClosed().subscribe(() => {
      if (this.transactionType === this.transferType.BUY_AIRTIME) {
        //TODO Open phone number modal
      }
    });
  }
}
