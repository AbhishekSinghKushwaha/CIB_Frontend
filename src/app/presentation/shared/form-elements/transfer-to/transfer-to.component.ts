import { Component, forwardRef, Input, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { recipientModel } from "src/app/core/domain/recipient.model";
import { NewRecipientService } from "src/app/core/services/modal-services/new-recipient.service";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";
import { mockData } from "src/app/core/utils/constants/mockdata.constants";
import { TransferToService } from "src/app/core/services/modal-services/transfer-to.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { MerchantDetailsService } from 'src/app/core/services/merchant-details/merchant-details.service';

@Component({
  selector: "app-transfer-to",
  templateUrl: "./transfer-to.component.html",
  styleUrls: ["./transfer-to.component.scss"],
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

  favouriteMerchantDetails: any[];

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
    private sharedDataService: SharedDataService,
    private readonly merchantDetailsService: MerchantDetailsService
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
        this.merchantDetailsService.favouriteMerchantDetails.subscribe((res) => {
          this.favouriteMerchantDetails = res;
        });
        this.transferToService.openTransferToModal({
          favourites: this.favouriteMerchantDetails,
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
          favourites: mockData.favourites,
          transactionType: this.transactionType,
        });
        break;
      case this.transferType.PESALINK:
        this.transferToService.openTransferToModal({
          favourites: mockData.favourites,
          transactionType: this.transactionType,
        });
        break;
      case this.transferType.INTER_COUNTRY_TRANSFER:
        this.transferToService.openTransferToModal({
          favourites: mockData.favourites,
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
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case this.transferType.RTGS: // RTGS
        this.newRecipientService.data.subscribe((x) => {
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case this.transferType.MOBILE_MONEY: // Mobile Money
        this.newRecipientService.data.subscribe((x) => {
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case this.transferType.BUY_GOODS:
        this.newRecipientService.data.subscribe((x) => {
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case this.transferType.PESALINK:
        this.newRecipientService.data.subscribe((x) => {
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case this.transferType.SWIFT:
        this.newRecipientService.data.subscribe((x) => {
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
      case this.transferType.INTER_COUNTRY_TRANSFER:
        this.newRecipientService.data.subscribe((x) => {
          this.parentForm.controls.sendTo.setValue(x);
        });
        break;
        break;
      default:
        break;
    }
  }
}
