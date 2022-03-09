import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NewRecipientService } from "src/app/core/services/modal-services/new-recipient.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { PesalinkService } from "src/app/core/services/transfers/pesalink/pesalink.service";

@Component({
  selector: "app-pesalink-new-recipient",
  templateUrl: "./pesalink-new-recipient.component.html",
  styleUrls: ["./pesalink-new-recipient.component.scss"],
})
export class PesalinkNewRecipientComponent implements OnInit {
  setAccount: any; // TODO:: Give the correct interface for account details
  @Input() mode: string;

  selectBankForm: FormGroup;

  phoneLinkedForm: FormGroup;

  transferType = TransactionTypeConstants.TransferType;
  constructor(
    private readonly fb: FormBuilder,
    private readonly newRecipientService: NewRecipientService,
    private readonly dialogRef: MatDialogRef<PesalinkNewRecipientComponent>,
    private dialog: MatDialog,
    private readonly pesalinkService: PesalinkService,
  ) {
    this.setAccount = this.newRecipientService.default;
    this.newRecipientService.data.subscribe((x) => (this.setAccount = x));
  }

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.selectBankForm = this.fb.group({
      bank: ["", [Validators.required]],
      accountName: ["", [Validators.required]],
      accountNumber: ["", [Validators.required]],
    });

    this.phoneLinkedForm = this.fb.group({
      phoneNumber: ["", [Validators.required]],
      bank: ["", [Validators.required]],
    });
  }

  submit() {
    const phonePayload = {
      receiverPhone: this.phoneLinkedForm.controls.phoneNumber.value,
      reference: "string",
      countryCode: "KE",
      destinationBankCode: this.phoneLinkedForm.controls.bank.value.bankCode,
    }
    const payload = {
      accountNumber: this.selectBankForm.controls.accountNumber.value,
      bankCode: '54',
    };
    this.mode === "bank"
      ? 
      this.pesalinkService.nameEnquiry(payload).subscribe((res) => {
        if (res.status) {
          this.setAccount = {
            accountNumber: res.data.accountNumber,
            accountName: res.data.accountName,
            currency: res.data.currency,
            bank: this.selectBankForm.controls.bank.value,
          };
          this.newRecipientService.set(this.setAccount);
          this.dialog.closeAll();
        } else {
          alert(res.message);
          // TODO:: Throw Error
        }
      })
      : this.pesalinkService.phoneAccountsInquiry(phonePayload).subscribe((res) => {
        if (res.status) {
          this.setAccount = {
            accountNumber: res.data.accountNumber,
            accountName: res.data.accountName,
            currency: res.data.currency,
            bank: this.phoneLinkedForm.controls.bank.value
          };
          this.newRecipientService.set(this.setAccount);
          this.dialog.closeAll();
        } else {
          alert(res.message);
          // TODO:: Throw Error
        }
      })
  }

  close() {
    this.dialogRef.close();
  }
}
