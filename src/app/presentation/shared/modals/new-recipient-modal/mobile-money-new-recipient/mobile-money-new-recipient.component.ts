import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { UniversalValidators } from "ngx-validators";
import { MobileWallet } from "src/app/core/domain/transfer.models";
import { MobileWalletsService } from "src/app/core/services/modal-services/mobile-wallets.service";
import { NewRecipientService } from "src/app/core/services/modal-services/new-recipient.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-mobile-money-new-recipient",
  templateUrl: "./mobile-money-new-recipient.component.html",
  styleUrls: ["./mobile-money-new-recipient.component.scss"],
})
export class MobileMoneyNewRecipientComponent implements OnInit {
  mobileMoneyNewRecipientForm: FormGroup;
  transferTypes = TransactionTypeConstants.TransferType;
  @Input() transferType: string;
  constructor(
    private fb: FormBuilder,
    private newRecipientService: NewRecipientService,
    private dialogRef: MatDialogRef<MobileMoneyNewRecipientComponent>,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private selectedOperator: MobileWallet,
    private mobileWalletService: MobileWalletsService
  ) {}

  ngOnInit(): void {
    this.initForm();
    console.log(this.selectedOperator);
  }

  initForm() {
    this.mobileMoneyNewRecipientForm = this.fb.group({
      phoneNumber: [
        "",
        [UniversalValidators.isNumber, UniversalValidators.noWhitespace],
      ],
    });
  }

  submit() {
    // TODO:: Mobile Operator Name Search i.e for the case of safaricom
    const payload = {
      accountNumber:
        this.mobileMoneyNewRecipientForm.controls.phoneNumber.value,
      bankCode: this.selectedOperator.wallet,
      transferType: Number(this.transferTypes.MOBILE_MONEY),
    };
    this.mobileWalletService.walletNameEnquiry(payload).subscribe((res) => {
      const data = {
        accountName: res.data.accountName,
        mobileWallet: this.selectedOperator,
        ...this.mobileMoneyNewRecipientForm.getRawValue(),
      };
      this.newRecipientService.set(data);
      this.dialog.closeAll();
    });
  }

  close() {
    this.dialogRef.close();
  }
}
