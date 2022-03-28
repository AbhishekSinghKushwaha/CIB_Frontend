import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TransferToService } from "src/app/core/services/modal-services/transfer-to.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-transfer-to-modal",
  templateUrl: "./transfer-to-modal.component.html",
  styleUrls: ["./transfer-to-modal.component.scss"],
})
export class TransferToModalComponent implements OnInit {
  transferType = TransactionTypeConstants.TransferType;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly transferToService: TransferToService
  ) {}

  ngOnInit(): void {}

  close() {
    this.transferToService.closeTransferToModal();
  }
}
