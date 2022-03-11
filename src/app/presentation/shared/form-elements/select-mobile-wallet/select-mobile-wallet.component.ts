import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MobileWalletsService } from "src/app/core/services/modal-services/mobile-wallets.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { TransferTypeModalService } from "src/app/core/services/transaction-type-modal/transaction-type-modal.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-select-mobile-wallet",
  templateUrl: "./select-mobile-wallet.component.html",
  styleUrls: ["./select-mobile-wallet.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectMobileWalletComponent),
      multi: true,
    },
  ],
})
export class SelectMobileWalletComponent implements OnInit {
  wallets: any[];

  @Input()
  parentForm!: FormGroup;

  @Input()
  public fieldName!: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  @Input() transactionType!: string;

  public value!: any;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }

  transferType = TransactionTypeConstants.TransferType;
  constructor(
    private readonly mobileWalletService: MobileWalletsService,
    private readonly storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    this.mobileWalletService.selectedWallet$.subscribe((response) => {
      this.parentForm.controls.mobileWallet.setValue(response);
    });
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

  openMobileWalletModal() {
    this.mobileWalletService.openMobileWalletModal(
      this.storageService.getData("wallets")
    );

    this.mobileWalletService.mobileWalletModalRef
      .afterClosed()
      .subscribe(() => {
        if (this.transactionType === this.transferType.MOBILE_MONEY) {
          //TODO Open phone number modal
        }
      });
  }
}
