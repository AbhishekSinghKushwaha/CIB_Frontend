import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CurrencySelectionService } from 'src/app/core/services/modal-services/currency-selection.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { CurrencyModel, FromAccount, TransferAmount } from 'src/app/core/domain/transfer.models';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InternationalAirtimeAmountRangeService } from 'src/app/core/services/international-airtime-amount-range/international-airtime-amount-range.service';
import { AirtimeAmountRangeModel } from 'src/app/core/domain/international-airtime-amount-range.model';
import { FixedRangeService } from 'src/app/core/services/fixed-range/fixed-range.service';
import { FixedRangeConstants } from 'src/app/core/utils/constants/fixed-range.constants';
import { FixedRangeModel } from 'src/app/core/domain/fixed-range.model';
import { TransferFromService } from 'src/app/core/services/modal-services/transfer-from.service';

@Component({
  selector: 'app-buyairtime-amount',
  templateUrl: './buyairtime-amount.component.html',
  styleUrls: ['./buyairtime-amount.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BuyairtimeAmountComponent),
      multi: true,
    },
  ],
})
export class BuyairtimeAmountComponent implements ControlValueAccessor, OnInit {

  @Input() parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public currencyFieldName!: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  currency: CurrencyModel = {currencyCode: '', currencyDescription: ''};

  public value: TransferAmount = {amount: 0, currency: '', isWithinLimit: true};

  sendFromAccount: FromAccount;

  public changed!: (value: TransferAmount) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  amount: number;
  amountUpdate = new Subject<number>();

  selected: AirtimeAmountRangeModel;
  fixedAmount: FixedRangeModel;

  constructor(
    private readonly currencySelectionService: CurrencySelectionService,
    private readonly currencySelectionConstants: CurrencySelectionConstants,
    private readonly internationalAirtimeAmountRangeService: InternationalAirtimeAmountRangeService,
    private readonly fixedRangeService: FixedRangeService,
    private readonly fixedRangeConstants: FixedRangeConstants,
    private readonly transferFromService: TransferFromService
  ) { 
    this.currencySelectionService.selected.subscribe((x) => this.currency = x);
    
    this.selected = this.internationalAirtimeAmountRangeService.default;
    this.internationalAirtimeAmountRangeService.selected.subscribe((x) => this.selected = x);
    
    this.fixedAmount = this.fixedRangeService.default;
    this.fixedRangeService.selected.subscribe((res) => {
      this.fixedAmount = res;
      this.value.amount = res.text;
      this.value.currency = this.currency.currencyCode;
    });
  }

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

  openCurrencyModal() {
    this.currencySelectionService.open(this.currencySelectionConstants.CURRENCY_LISTINGS);
  }

  openFixedRange(): void {
    this.fixedRangeService.open(
      this.fixedRangeConstants.FIXED_RANGE
    );
  }
}
