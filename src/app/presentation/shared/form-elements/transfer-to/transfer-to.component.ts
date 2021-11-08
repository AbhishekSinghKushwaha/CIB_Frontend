import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { SelectAccountSendtoService } from 'src/app/core/services/select-account-sendto/select-account-sendto.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';
import { BaseTransactComponent } from 'src/app/presentation/modules/post-login/transact/base-transact.component';

@Component({
  selector: 'app-transfer-to',
  templateUrl: './transfer-to.component.html',
  styleUrls: ['./transfer-to.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransferToComponent),
      multi: true,
    },
  ],
})
export class TransferToComponent extends BaseTransactComponent implements ControlValueAccessor, OnInit {
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
  constructor(
    private readonly selectAccountSendtoService: SelectAccountSendtoService,
    private readonly selectAccountConstants:SelectAccountConstants,
    private readonly accountsService: AccountsService
  ) {
    super(accountsService)
  }

  ngOnInit(): void {
    this.getUserAccounts();
    this.listenToDataStreams();
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
        this.selectAccountSendtoService.open(
          this.accounts
        );
        break;
      case 'intraBankTransfer':
      // Open Favourites
      default:
        break;
    }
  }

  listenToDataStreams() {
    switch (this.transactionType) {
      case 'ownEquityAccount':
        this.selectAccountSendtoService.selected.subscribe((x) => {
          this.parentForm.controls.sendTo.setValue(x)
        });
        break;
    
      default:
        break;
    }
  }
}
