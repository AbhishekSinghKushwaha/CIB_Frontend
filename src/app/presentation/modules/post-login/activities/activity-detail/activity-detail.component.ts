import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationCompletionModel } from "src/app/core/domain/confirmation-completion.model";
import { ConfirmationModel } from "src/app/core/domain/confirmation.model";
import { TransactionListmodel } from "src/app/core/domain/transaction-list.model";
import { TransactionReceiptModalService } from "src/app/core/services/modal-services/transaction-receipt-modal/transaction-receipt-modal.service";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";
import { mockData } from "src/app/core/utils/constants/mockdata.constants";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { confirmModal } from "src/app/presentation/shared/decorators/confirm-dialog.decorator";
import { SupportingDocumentsUploadService } from "./../../../../../core/services/supporting-documents-upload/supporting-documents-upload.service";

@Component({
  selector: "app-activity-detail",
  templateUrl: "./activity-detail.component.html",
  styleUrls: ["./activity-detail.component.scss"],
})
export class ActivityDetailComponent implements OnInit {
  show = true;
  id: number;
  status: string;
  category: string;
  data: TransactionListmodel;
  transactionDetail: ConfirmationModel[] = mockData.transactionDetail;
  transactionIcon = {
    Approved: "transaction_approved",
    Rejected: "transaction_rejected",
    Pending: "transaction_pending",
  };
  completionData: ConfirmationCompletionModel = {
    title: "",
    buttonText: "Done",
    message: "Transaction submitted for approval",
    subMessage: `<div>Transaction of 0.00 KES, daily transaction limit 0.00 KES was submitted on 16/04/2020 at 10:45:23 for approval.</div>
   <div>You will be notified once the transaction has been reviewed.</div>`,
    icon: "assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg",
  };

  approvalStatus = TransactionTypeConstants.TransactionApprovalStatus;
  transactionType = TransactionTypeConstants.TransferType;

  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly transactionReceiptModalService: TransactionReceiptModalService,
    private transactionService: TransactionsService
  ) {
    this.id = route.snapshot.params["id"];
    this.category = route.snapshot.params["type"];
    this.getTransaction(this.id, this.category);
  }

  ngOnInit(): void {}

  getTransaction(index: number, category: string) {
    // this.data = mockData.pendingTransactions[index];
    console.log(this.data);
    category === "history"
      ? this.transactionService.historyTransactions$.subscribe((res) => {
          this.data = res[index];
        })
      : category === "pending"
      ? this.transactionService.pendingTransactions$.subscribe((res) => {
          this.data = res[index];
          console.log(this.data);
        })
      : category === "standingOrder"
      ? this.transactionService.standingOrders$.subscribe((res) => {
          this.data = res[index];
        })
      : {};
  }

  openUploadModal() {
    this.supportingDocumentsUploadService.open();
  }

  openReceipt() {
    this.transactionReceiptModalService.open();
  }

  @confirmModal({
    title: "Transaction request rejection",
    message: "Reason for rejection",
    cancelText: "Submit",
    confirmText: "Cancel",
  })
  reject() {
    const payload = {
      references: [this.data.requestReference],
      transactionApprovalStatus: this.approvalStatus.Rejected,
    };
    this.transactionService.setApprovalPayload(payload);
    this.router.navigate([`/transact/otp-verification/reject-transaction`]);
  }

  approve() {
    const payload = {
      references: [this.data.requestReference],
      transactionApprovalStatus: this.approvalStatus.Approved,
    };
    this.transactionService.setApprovalPayload(payload);
    this.router.navigate([`/transact/otp-verification/approve-transaction`]);
  }

  reinitiate() {
    this.status = "Reinitiated";
  }

  confirmationDone(data: boolean) {}

  getTransactionStatusKey(status: number): string {
    let approvalStatus = "";
    for (const [key, value] of Object.entries(this.approvalStatus)) {
      if (value === status) {
        approvalStatus = key;
      }
    }
    return approvalStatus;
  }

  getTransactionStatusValue(status: number): number {
    let approvalStatus = 0;
    for (const [key, value] of Object.entries(this.approvalStatus)) {
      if (value === status) {
        approvalStatus = value;
      }
    }
    return approvalStatus;
  }

  setIcon(approvalStatus: number): string {
    let icon = "";
    switch (this.getTransactionStatusValue(approvalStatus)) {
      case this.approvalStatus.Pending:
        icon = this.transactionIcon.Pending;
        break;
      case this.approvalStatus.Approved:
        icon = this.transactionIcon.Approved;
        break;
      case this.approvalStatus.Rejected:
        icon = this.transactionIcon.Rejected;
        break;

      default:
        break;
    }
    return icon;
  }

  editTransaction(transferType: number) {
    switch (transferType) {
      case Number(this.transactionType.OWN_EQUITY):
        this.router.navigate(["/transact/own-equity-account/" + this.id]);
        break;
      case Number(this.transactionType.INTRA_BANK):
        this.router.navigate(["/transact/other-equity-account/" + this.id]);
        break;

      default:
        break;
    }
  }
}
