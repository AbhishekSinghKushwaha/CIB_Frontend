import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { CountryModel } from "src/app/core/domain/bank.model";
import { MobileWallet } from "src/app/core/domain/transfer.models";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { countrySettings } from "src/app/core/utils/constants/country.settings";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
@Component({
  selector: "app-new-recipient-modal",
  templateUrl: "./new-recipient-modal.component.html",
  styleUrls: ["./new-recipient-modal.component.scss"],
})
export class NewRecipientModalComponent implements OnInit {
  selected: any; // TODO:: Give the correct interface for account details
  accountNumber: string;
  newRecipientForm: FormGroup;
  country: CountryModel;
  countrySelectType = countrySettings.viewTypes.FLAG_AND_NAME;

  transferType = TransactionTypeConstants.TransferType;

  mobileWallets: MobileWallet[];

  constructor(
    readonly dialogRef: MatDialogRef<NewRecipientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.data === this.transferType.MOBILE_MONEY
      ? (this.mobileWallets = this.storageService.getData("wallets"))
      : this.data;
  }
}
