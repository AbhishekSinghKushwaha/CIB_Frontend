import { Component, forwardRef, Input, OnDestroy, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Observable, of, Subject, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import {
  CurrencyModel,
  FromAccount,
  TransferAmount,
} from "src/app/core/domain/transfer.models";
import { CurrencySelectionService } from "src/app/core/services/modal-services/currency-selection.service";
import { TransferFromService } from "src/app/core/services/modal-services/transfer-from.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { CurrencySelectionConstants } from "src/app/core/utils/constants/currency-selection.constants";
import { SharedUtils } from "src/app/core/utils/shared.util";
@Component({
  selector: "app-transfer-amount",
  templateUrl: "./transfer-amount.component.html",
  styleUrls: ["./transfer-amount.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TransferAmountComponent),
      multi: true,
    },
  ],
})
export class TransferAmountComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input() parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public currencyFieldName!: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  currency: CurrencyModel = { currencyCode: "", currencyDescription: "" };

  public value: TransferAmount = {
    amount: 0,
    currency: "",
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

  conversionRate: any;

  subscriptions: Subscription[] = [];

  constructor(
    public readonly currencySelectionService: CurrencySelectionService,
    private readonly transferFromService: TransferFromService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.listenToDataEvents();
  }

  ngOnDestroy(): void {
    SharedUtils.unSubscribe(this.subscriptions);
  }

  // Listen to events, pick the sendFrom data
  async listenToDataEvents() {
    // Get sendFrom Account
    this.subscriptions.push(
      this.transferFromService.transferFromAmount$.subscribe((x) => {
        this.sendFromAccount = x;
        this.currency.currencyCode = x.currency || "";
        this.calcExchangeRate();
      })
    );

    // Get Selected Currency
    this.subscriptions.push(
      this.currencySelectionService.selected.subscribe((x) => {
        this.currency = x;
        this.currencyFieldName &&
          this.parentForm.controls[this.currencyFieldName].setValue(
            this.currency
          );
        this.calcExchangeRate();
      })
    );

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
      this.storageService.getData("currencies")
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
        this.calcExchangeRate();
      });
  }

  /**
   * Calculate limits
   * TODO:: Factor in limits as per transcations and daily limit calculations
   */
  checkLimit() {
    const limit = this.sendFromAccount?.transactionLimit || 0;
    if (this.value.amount > limit) {
      this.value.isWithinLimit = false;
      this.value.currency = this.currency.currencyCode;
      this.changed(this.value);
    } else {
      this.value.isWithinLimit = true;
      this.value.currency = this.currency.currencyCode;
      this.changed(this.value);
    }
  }

  calcExchangeRate() {
    if (
      this.sendFromAccount?.currency !== this.currency.currencyCode &&
      this.value.amount > 0
    ) {
      const payload = {
        sourceAccount: this.sendFromAccount?.accountNumber || "",
        fromCurrency: this.sendFromAccount.currency || "",
        toCurrency: this.currency.currencyCode || "",
        amount: this.value.amount || 0,
      };
      this.currencySelectionService
        .getConversionRate(payload)
        .subscribe((res) => {
          if (res.status) {
            this.conversionRate = res.data;
          }
        });
    }
  }

  // Get limits of the account

  // Determine if account is more than 10,000,000
}
