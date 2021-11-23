import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { recipientModel } from 'src/app/core/domain/recipient.model';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { FavouritesModalService } from 'src/app/core/services/favourites-modal/favourites-modal.service';
import { NewRecipientService } from 'src/app/core/services/new-recipient/new-recipient.service';
import { SelectAccountSendtoService } from 'src/app/core/services/select-account-sendto/select-account-sendto.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
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
export class TransferToComponent
  extends BaseTransactComponent
  implements ControlValueAccessor, OnInit
{
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

  public value!: recipientModel;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor(
    private readonly selectAccountSendtoService: SelectAccountSendtoService,
    private readonly selectAccountConstants: SelectAccountConstants,
    private readonly favouritesModalService: FavouritesModalService,
    private readonly accountsService: AccountsService,
    private newRecipientService: NewRecipientService
  ) {
    super(accountsService);
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

  // TODO:: Get beneficiaries as per the transaction type

  // Open transfer to modal based on transaction type
  openTransferToModal() {
    switch (this.transactionType) {
      case 'ownEquityAccount':
        this.selectAccountSendtoService.open(this.accounts);
        break;
      case 'intraBankTransfer':
        // Open Favourites
        this.favouritesModalService.open(
          this.transactionType,
          mockData.favourites
        );
        break;
      case 'interBankTransfer':
        this.favouritesModalService.open(
          this.transactionType,
          mockData.favourites
        );
        break;
      default:
        break;
    }
  }

  listenToDataStreams() {
    switch (this.transactionType) {
      case 'ownEquityAccount':
        this.selectAccountSendtoService.selected.subscribe((x) => {
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case 'intraBankTransfer':
        this.newRecipientService.data.subscribe((x) => {
          console.log(x);
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case 'interBankTransfer':
        this.newRecipientService.data.subscribe((x) => {
          console.log(x);
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      default:
        break;
    }
  }
}
