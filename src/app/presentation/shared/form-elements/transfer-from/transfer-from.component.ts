import { Component, forwardRef, Input, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { FromAccount } from "src/app/core/domain/transfer.models";
import { AccountsService } from "src/app/core/services/accounts/accounts.service";
import { TransferFromService } from "src/app/core/services/modal-services/transfer-from.service";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";

@Component({
  selector: "app-transfer-from",
  templateUrl: "./transfer-from.component.html",
  styleUrls: ["./transfer-from.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransferFromComponent),
      multi: true,
    },
  ],
})
export class TransferFromComponent implements ControlValueAccessor, OnInit {
  sourceAccounts: FromAccount[];

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
  constructor(
    private readonly sharedDataService: SharedDataService,
    private readonly accountsService: AccountsService,
    private readonly transferFromAccountService: TransferFromService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.userAccounts$.subscribe((res) => {
      this.sourceAccounts = res;
    });

    this.transferFromAccountService.transferFromAmount$.subscribe((x) => {
      this.parentForm.controls[this.fieldName].setValue(x);
      this.writeValue(x);
    });
  }

  public writeValue(value: FromAccount): void {
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

  openTransferFromModal() {
    // Remove accounts that have been selected under sendTo
    const accounts = this.sourceAccounts.filter((el) => {
      return (
        el.accountNumber !== this.parentForm.controls?.accountNumber?.value
      );
    });
    this.transferFromAccountService.openTransferFromModal(accounts);
  }

  // Subscribe to Account Selection Event

  // Get User Accounts
}
