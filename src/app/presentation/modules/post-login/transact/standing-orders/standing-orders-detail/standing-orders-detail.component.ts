import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationCompletionModel } from "src/app/core/domain/confirmation-completion.model";
import { ConfirmationModel } from "src/app/core/domain/confirmation.model";
import { StandingOrdersListmodel } from "src/app/core/domain/standing-orders-list.model";
import { confirmModal } from "src/app/presentation/shared/decorators/confirm-dialog.decorator";
import { DeleteService } from "src/app/core/services/delete/delete.service";
import { StandingOrdersService } from "src/app/core/services/transfers/standing-orders/standing-orders.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-standing-orders-detail",
  templateUrl: "./standing-orders-detail.component.html",
  styleUrls: ["./standing-orders-detail.component.scss"],
})
export class StandingOrdersDetailComponent implements OnInit {
  show = true;
  id: number;
  status: string;
  category: string;
  data: StandingOrdersListmodel;
  standingOrdersList: any;
  transferType = TransactionTypeConstants.TransferType;
  transactionType: string;
  transactionConversion: string;
  transactionIcon = {
    Active: "transaction_approved",
    Inactive: "transaction_pending",
  };
  completionData: ConfirmationCompletionModel = {
    title: "",
    buttonText: "Done",
    message: "Transaction submitted for approval",
    subMessage: `<div>Transaction of 0.00 KES, daily transaction limit 0.00 KES was submitted on 16/04/2020 at 10:45:23 for approval.</div>
   <div>You will be notified once the transaction has been reviewed.</div>`,
    icon: "assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg",
  };

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly deleteService: DeleteService,
    private readonly standingOrdersService: StandingOrdersService
  ) {
    this.id = route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.standingOrdersService.getScheduleId(this.id).subscribe((response) => {
      this.standingOrdersList = response.data;
      this.formatTransactionType();
    });
  }

  update() {
    console.log("update");
  }

  formatTransactionType() {
    this.transactionConversion =
      this.standingOrdersList.transferType.toString();

    switch (this.transactionConversion) {
      case this.transferType.OWN_EQUITY:
        this.transactionType = "Send To Your Own Equity Account";
        break;
      case this.transferType.INTRA_BANK:
        this.transactionType = "Send To An Equity Account";
        break;
      case this.transferType.EFT:
        this.transactionType = "Send to another bank via EFT";
        break;
      case this.transferType.RTGS:
        this.transactionType = "Send to another bank via RTGS";
        break;
      case this.transferType.MOBILE_MONEY:
        this.transactionType = "Send via Mobile Money";
        break;
      case this.transferType.PESALINK:
        this.transactionType = "Send via Pesalink";
        break;
      case this.transferType.SWIFT:
        this.transactionType = "Send to another bank via SWIFT";
        break;
      case this.transferType.BUY_AIRTIME:
        this.transactionType = "Buy Airtime";
        break;
      case this.transferType.BUY_GOODS:
        this.transactionType = "Buy Goods";
        break;
      default:
        break;
    }
  }

  delete() {
    const payload = {
      id: this.id,
      title: "Are you sure?",
      message:
        "Once you delete, all their details will be deleted. You can add them again anytime.",
      buttonNo: "No, I'm not",
      buttonYes: "Yes, I’m sure",
    };
    this.deleteService.open(payload);
  }

  editStandingOrder(index: number) {
    this.router.navigate([`/transact/standing-orders/edit/${index}`]);
  }
}
