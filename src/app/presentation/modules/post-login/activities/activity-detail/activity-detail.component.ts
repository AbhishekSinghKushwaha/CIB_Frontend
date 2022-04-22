import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ConfirmationCompletionModel } from "src/app/core/domain/confirmation-completion.model";
import { ConfirmationModel } from "src/app/core/domain/confirmation.model";
import { TransactionListmodel } from "src/app/core/domain/transaction-list.model";
import { ReasonModalService } from "src/app/core/services/modal-services/reason-modal/reason-modal.service";
import { TransactionReceiptModalService } from "src/app/core/services/modal-services/transaction-receipt-modal/transaction-receipt-modal.service";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";
import { mockData } from "src/app/core/utils/constants/mockdata.constants";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { SharedUtils } from "src/app/core/utils/shared.util";
import { SupportingDocumentsUploadService } from "./../../../../../core/services/supporting-documents-upload/supporting-documents-upload.service";

@Component({
  selector: "app-activity-detail",
  templateUrl: "./activity-detail.component.html",
  styleUrls: ["./activity-detail.component.scss"],
})
export class ActivityDetailComponent implements OnInit, OnDestroy {
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

  subscriptions: Subscription[] = [];

  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly transactionReceiptModalService: TransactionReceiptModalService,
    private transactionService: TransactionsService,
    private reasonModalService: ReasonModalService
  ) {
    this.id = route.snapshot.params["id"];
    this.category = route.snapshot.params["type"];
    this.getTransaction(this.id, this.category);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    SharedUtils.unSubscribe(this.subscriptions);
  }

  getTransaction(index: number, category: string) {
    category === "history"
      ? this.subscriptions.push(
          this.transactionService.historyTransactions$.subscribe((res) => {
            this.data = res[index];
          })
        )
      : category === "pending"
      ? this.subscriptions.push(
          this.transactionService.pendingTransactions$.subscribe((res) => {
            this.data = res[index];
          })
        )
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
    this.transactionReceiptModalService.open(this.data);
  }

  reject() {
    const payload = {
      references: [this.data.requestReference],
      transactionApprovalStatus: this.approvalStatus.Rejected,
      remarks: "",
    };
    this.reasonModalService.open(payload);
  }

  approve() {
    const payload = {
      references: [this.data.requestReference],
      transactionApprovalStatus: this.approvalStatus.Approved,
      remarks: "",
    };
    this.transactionService.setApprovalPayload(payload);
    this.router.navigate([`/transact/otp-verification/approve-transaction`]);
  }

  reinitiate() {
    this.transactionService.setReinitiatePayload(this.data);
    this.router.navigate([`/transact/otp-verification/reinitiate-transaction`]);
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
    this.transactionService.setTransaction(this.data);
    switch (transferType) {
      case Number(this.transactionType.OWN_EQUITY):
        this.router.navigate(["/transact/own-equity-account/"]);
        break;
      case Number(this.transactionType.INTRA_BANK):
        this.router.navigate(["/transact/other-equity-account/"]);
        break;
      case Number(this.transactionType.SWIFT):
        this.router.navigate(["/transact/swift/"]);
        break;
      case Number(this.transactionType.PESALINK):
        this.router.navigate(["/transact/pesalink/"]);
        break;
      case Number(this.transactionType.MOBILE_MONEY):
        this.router.navigate(["/transact/mobile-money/"]);
        break;
      case Number(this.transactionType.RTGS):
        this.router.navigate(["/transact/other-banks/"]);
        break;
      case Number(this.transactionType.EFT):
        this.router.navigate(["/transact/other-banks/"]);
        break;
      case Number(this.transactionType.BUY_AIRTIME):
        this.router.navigate(["/transact/buy-airtime/"]);
        break;
      case Number(this.transactionType.BUY_GOODS):
        this.router.navigate(["/transact/buy-goods/"]);
        break;
      default:
        break;
    }
  }
}
