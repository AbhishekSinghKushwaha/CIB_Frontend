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
import { NewRecipientService } from 'src/app/core/services/modal-services/new-recipient.service';
import { SelectAccountSendtoService } from 'src/app/core/services/select-account-sendto/select-account-sendto.service';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { BuyGoodsPayToService } from 'src/app/core/services/buy-goods-pay-to/buy-goods-pay-to.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';
import { BaseTransactComponent } from 'src/app/presentation/modules/post-login/transact/base-transact.component';
import { MerchantTillNumberService } from 'src/app/core/services/merchant-till-number/merchant-till-number.service';
import { TransferToService } from 'src/app/core/services/modal-services/transfer-to.service';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';

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
export class TransferToComponent implements ControlValueAccessor, OnInit {
  destinationAccounts: any[];

  @Input() transactionType!: string;

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

  transferType = TransactionTypeConstants.TransferType;
  constructor(
    private readonly transferToService: TransferToService,
    private readonly newRecipientService: NewRecipientService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
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

  // Open transfer to modal based on transaction type and pass the required paramenters
  openTransferToModal() {
    switch (this.transactionType) {
      case this.transferType.OWN_EQUITY:
        let accounts = this.destinationAccounts.filter((el) => {
          return (
            el.accountNumber !==
            this.parentForm.controls.sendFrom.value.accountNumber
          );
        });
        this.transferToService.openTransferToModal({
          favourites: accounts,
          transactionType: this.transactionType,
        });
        break;
      case this.transferType.INTRA_BANK:
        this.transferToService.openTransferToModal({
          favourites: mockData.favourites,
          transactionType: this.transactionType,
        });
        break;
      case this.transferType.EFT:
        this.transferToService.openTransferToModal({
          favourites: mockData.favourites,
          transactionType: this.transactionType,
        });
        break;
      case this.transferType.RTGS:
        this.transferToService.openTransferToModal({
          favourites: mockData.favourites,
          transactionType: this.transactionType,
        });
        break;
      case this.transferType.BUY_GOODS:
        this.transferToService.openTransferToModal({
          favourites: mockData.buyGoodsFavourites,
          transactionType: this.transactionType,
        });
        break;
      case this.transferType.MOBILE_MONEY:
        this.transferToService.openTransferToModal({
          favourites: mockData.favourites,
          transactionType: this.transactionType,
        });
        break;
      case this.transferType.SWIFT:
        this.transferToService.openTransferToModal({
          favourites: mockData.buyGoodsFavourites,
          transactionType: this.transactionType,
        });
        break;
      default:
        break;
    }
  }

  listenToDataStreams() {
    console.log(this.transactionType);
    switch (this.transactionType) {
      case this.transferType.OWN_EQUITY: // Own Equity Account
        this.sharedDataService.userAccounts.subscribe((res) => {
          this.destinationAccounts = res;
        });
        this.transferToService.selectedTransferToAccount.subscribe((x) => {
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case this.transferType.INTRA_BANK: // Another Equity Account
        this.newRecipientService.data.subscribe((x) => {
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case this.transferType.EFT: // EFT
        this.newRecipientService.data.subscribe((x) => {
          console.log(x);
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case this.transferType.RTGS: // RTGS
        this.newRecipientService.data.subscribe((x) => {
          console.log(x);
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      // case 'fundTransferBuyGoods':
      //   this.buyGoodsPayToService.selected.subscribe((x) => {
      //     console.log(x);
      //     this.parentForm.controls.sendTo.setValue(x);
      //   });
      //   this.merchantTillNumberService.data.subscribe((x) => {
      //     console.log(x);
      //     this.parentForm.controls.sendTo.setValue(x);
      //   });
      //   break;
      default:
        break;
    }
  }
}
