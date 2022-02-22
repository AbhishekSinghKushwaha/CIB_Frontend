import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { NewRecipientService } from "src/app/core/services/modal-services/new-recipient.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-pesalink-new-recipient",
  templateUrl: "./pesalink-new-recipient.component.html",
  styleUrls: ["./pesalink-new-recipient.component.scss"],
})
export class PesalinkNewRecipientComponent implements OnInit {
  @Input() mode: string;

  selectBankForm: FormGroup;

  phoneLinkedForm: FormGroup;

  transferType = TransactionTypeConstants.TransferType;
  constructor(
    private readonly fb: FormBuilder,
    private readonly newRecipientService: NewRecipientService,
    private readonly dialogRef: MatDialogRef<PesalinkNewRecipientComponent>,
    private dialog: MatDialog
  ) {}

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
    this.mode === "bank"
      ? this.newRecipientService.set(this.selectBankForm.getRawValue())
      : this.newRecipientService.set(this.phoneLinkedForm.getRawValue());
    this.dialog.closeAll();
  }

  close() {
    this.dialogRef.close();
  }
}
