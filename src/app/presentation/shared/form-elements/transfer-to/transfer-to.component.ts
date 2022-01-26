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
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { BuyGoodsPayToService } from 'src/app/core/services/buy-goods-pay-to/buy-goods-pay-to.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';
import { BaseTransactComponent } from 'src/app/presentation/modules/post-login/transact/base-transact.component';
import { MerchantTillNumberService } from 'src/app/core/services/merchant-till-number/merchant-till-number.service';

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
    private readonly favouritesModalService: FavouritesModalService,
    private readonly sharedDataService: SharedDataService,
    private newRecipientService: NewRecipientService,
    private readonly accountsService: AccountsService,
    private readonly buyGoodsPayToService: BuyGoodsPayToService,
    private readonly merchantTillNumberService: MerchantTillNumberService
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

  // Open transfer to modal based on transaction type
  openTransferToModal() {
    switch (this.transactionType) {
      case 'ownEquityAccount':
        let accounts = this.destinationAccounts.filter((el) => {
          return (
            el.accountNumber !==
            this.parentForm.controls.sendFrom.value.accountNumber
          );
        });
        this.selectAccountSendtoService.open(accounts);
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
      case 'fundTransferBuyGoods':
        this.buyGoodsPayToService.open(mockData.buyGoodsFavourites);
        break;
      case 'intercountryFundTransfer':
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
        this.sharedDataService.userAccounts.subscribe((res) => {
          this.destinationAccounts = res;
        });
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
      case 'fundTransferBuyGoods':
        this.buyGoodsPayToService.selected.subscribe((x) => {
          console.log(x);
          this.parentForm.controls.sendTo.setValue(x);
        });
        this.merchantTillNumberService.data.subscribe((x) => {
          console.log(x);
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case 'intercountryFundTransfer':
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
