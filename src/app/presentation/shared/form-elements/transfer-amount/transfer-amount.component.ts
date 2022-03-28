import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  CurrencyModel,
  FromAccount,
  TransferAmount,
} from 'src/app/core/domain/transfer.models';
import { CurrencySelectionService } from 'src/app/core/services/modal-services/currency-selection.service';
import { TransferFromService } from 'src/app/core/services/modal-services/transfer-from.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
@Component({
  selector: 'app-transfer-amount',
  templateUrl: './transfer-amount.component.html',
  styleUrls: ['./transfer-amount.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransferAmountComponent),
      multi: true,
    },
  ],
})
export class TransferAmountComponent implements ControlValueAccessor, OnInit {
  @Input() parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public currencyFieldName!: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  currency: CurrencyModel = { currencyCode: '', currencyDescription: '' };

  public value: TransferAmount = {
    amount: 0,
    currency: '',
    isWithinLimit: true,
  };

  sendFromAccount: FromAccount;

  public changed!: (value: TransferAmount) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  amount: number;
  amountUpdate = new Subject<number>();

  constructor(
    private readonly currencySelectionService: CurrencySelectionService,
    private readonly currencySelectionConstants: CurrencySelectionConstants,
    private readonly transferFromService: TransferFromService
  ) { }

  ngOnInit(): void {
    this.listenToDataEvents();
  }

  // Listen to events, pick the sendFrom data
  listenToDataEvents() {
    // Get sendFrom Account
    this.transferFromService.selectedTransferFromAccount.subscribe((x) => {
      this.sendFromAccount = x;
      this.currency.currencyCode = x.currency;
    });

    // Get Selected Currency
    this.currencySelectionService.selected.subscribe((x) => {
      this.currency = x;
      this.currencyFieldName && this.parentForm.controls[this.currencyFieldName].setValue(this.currency);
    });

    this.onAmountEntered();
  }

  public writeValue(value: TransferAmount): void {
    this.value = value;
  }

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.amountUpdate.next(Number(value));
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

  /**
   * Open Currency Modal
   * @param supportedCurrencies
   */
  openCurrencyModal() {
    this.currencySelectionService.open(
      this.currencySelectionConstants.CURRENCY_LISTINGS
    );
  }

  /**
   * Perfom limit validation once amount is entered
   */
  onAmountEntered() {
    this.amountUpdate
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((res) => {
        this.value.amount = res;
        this.checkLimit();
      });
  }

  /**
   * Calculate limits
   * TODO:: Factor in limits as per transcations and daily limit calculations
   */
  checkLimit() {
    if (this.value.amount > this.sendFromAccount.transactionLimit) {
      this.value.isWithinLimit = false;
      this.value.currency = this.currency.currencyCode;
      this.changed(this.value);
    } else {
      this.value.isWithinLimit = true;
      this.value.currency = this.currency.currencyCode;
      this.changed(this.value);
    }
  }

  // Get currency

  // Do the currency conversions in case of a change of currency

  // Get account that is being transferred from

  // Get limits of the account

  // Determine if account is more than 10,000,000
}
