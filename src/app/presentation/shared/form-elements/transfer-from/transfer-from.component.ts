import { Component, forwardRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';
import { BaseTransactComponent } from 'src/app/presentation/modules/post-login/transact/base-transact.component';

@Component({
  selector: 'app-transfer-from',
  templateUrl: './transfer-from.component.html',
  styleUrls: ['./transfer-from.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransferFromComponent),
      multi: true,
    },
  ],
})
export class TransferFromComponent extends BaseTransactComponent implements ControlValueAccessor, OnInit {
  sourceAccounts: FromAccount[];
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
    private readonly selectAccountService: SelectAccountModalService,
    private readonly selectAccountConstants: SelectAccountConstants,
    private readonly accountsService: AccountsService
  ) {
    super(accountsService)
  }

  ngOnInit(): void {
    this.getUserAccounts()
    this.selectAccountService.selected.subscribe((x) => {
      this.parentForm.controls.sendFrom.setValue(x)
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
    this.selectAccountService.open(
      this.accounts
    );
  }

  // Subscribe to Account Selection Event

  // Get User Accounts  
}
