import { Component, OnInit } from '@angular/core';
import { SupportingDocumentsUploadService } from "src/app/core/services/supporting-documents-upload/supporting-documents-upload.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseTransactComponent } from "../../base-transact.component";
import { accountLimitValidator } from "src/app/core/utils/validators/limits.validators";
import { OwnAccountService } from "src/app/core/services/transfers/own-account/own-account.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmPaymentComponent } from "src/app/presentation/shared/modals/confirm-payment/confirm-payment.component";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";

@Component({
  selector: 'app-standing-orders-form',
  templateUrl: './standing-orders-form.component.html',
  styleUrls: ['./standing-orders-form.component.scss']
})
export class StandingOrdersFormComponent extends BaseTransactComponent implements OnInit {

  standingOrdersForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  transferType = TransactionTypeConstants.TransferType;
  type = "Standing Orders";
  editMode: boolean = false;
  standingOrderId: any;
  
  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    snackbar: MatSnackBar,
    private ownEquityAccountService: OwnAccountService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly confirmationModalService: ConfirmationModalService,
    private route: ActivatedRoute,
  ) {
    super(snackbar);
    this.standingOrderId = route.snapshot.paramMap.get("id");
  }

  get getForm() {
    return this.standingOrdersForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }

  initForm(): void {
    this.standingOrdersForm = this.fb.group({
      transactionType: ["", [Validators.required]],
      sendFrom: ["", [Validators.required]],
      sendTo: [""],
      amount: [{}, [Validators.required, accountLimitValidator]],
      schedulePayment: ["", [Validators.required]],
      reason: [""],
    });
  }

  openSupportingDocuments(): void {
    this.supportingDocumentsUploadService.open();
  }

  // Confirm Payment and return the confirmation boolean before initiating payment.
  confirmPayment(transferFee: string) {
    const data = {
      title: "Standing order confirmation",
      subtitle: "To continue, please confirm your transaction",
      submitButtonText: "Submit",
      content: [
        {
          key: "Transaction",
          value: `${this.getForm.transactionType.value.type}`,
        },
        {
          key: "Amount",
          value: `${this.getForm.amount.value.amount} ${this.getForm.amount.value.currency}`,
        },
        {
          key: "Charges",
          value: `${transferFee} ${this.getForm.amount.value.currency}`,
        },
        {
          key: "New balance",
          value: `<span>4,999.99 KES</span> <br> <span>Available balance 999,999,999.99 KES</span>`,
        },
        {
          key: "To",
          value: "Victor Wanjohi",
        },
        {
          key: "From",
          value: `${this.getForm.sendFrom.value.accountName}<br>
            ${this.getForm.sendFrom.value.accountNumber}
          `,
        },
      ],
    };

    this.confirmationModalService
      .open(data)
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (data) {
          this.router.navigate([`/transact/otp-verification/${this.type}`]);
        }
      });
  }

  populateForm() {
    if(this.standingOrderId){
      this.editMode = true;
    }
  }

  submit() {
    this.confirmPayment("0.00");
  }

}
