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
    private readonly pesalinkService: PesalinkService
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

  // submit() {
  //   this.mode === "bank"
  //     ?this.newRecipientService.set(this.selectBankForm.getRawValue())
  //     : this.newRecipientService.set(this.phoneLinkedForm.getRawValue());
  //     this.dialog.closeAll();
  // }
  submit() {
    const bankPayload = {
      reference: "5B67CC0380",
      destinationAccount: this.selectBankForm.controls.accountNumber.value,
      destinationBankCode: "54",
      countryCode: "KE",
      customerId: "1234",
      bankId: "54"
    };

    const phonePayload = {
      receiverPhone: this.phoneLinkedForm.controls.phoneNumber.value,
      reference: "5B67CC0380",
      customerId: "1234",
      countryCode: "KE",
      destinationBankCode:"54",
    }
    this.mode === "bank"
      ? 
      this.pesalinkService.nameCheck(bankPayload).subscribe((res) => {
        if (res.status) {
          this.setAccount = {
            accountNumber: this.selectBankForm.controls.accountNumber.value,
            balance: 1000000, // TODO:: Work on the balance
            accountName: res.data.receiverName,
          };
          this.newRecipientService.set(this.setAccount);
          // this.newRecipientService.set(this.selectBankForm.getRawValue())
          this.dialog.closeAll();
        } else {
          alert(res.message);
          // TODO:: Throw Error
        }
      })
      : this.pesalinkService.phoneAccountsInquiry(phonePayload).subscribe((res) => {
        if (res.status) {
          this.setAccount = {
            accountNumber: this.phoneLinkedForm.controls.phoneNumber.value,
            balance: 1000000, // TODO:: Work on the balance
            currency: res.data.currency,
            accountName: res.data.accountName,
          };
          this.newRecipientService.set(this.setAccount);
          // this.newRecipientService.set(this.phoneLinkedForm.getRawValue());
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
