import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FromAccount } from "src/app/core/domain/transfer.models";
import { TransferFromService } from "src/app/core/services/modal-services/transfer-from.service";

@Component({
  selector: "app-transfer-from-modal",
  templateUrl: "./transfer-from-modal.component.html",
  styleUrls: ["./transfer-from-modal.component.scss"],
})
export class TransferFromModalComponent implements OnInit {
  selected!: FromAccount;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FromAccount[],
    private readonly transferFromService: TransferFromService
  ) {
    this.transferFromService.transferFromAmount$.subscribe(
      (x) => (this.selected = x)
    );
  }

  ngOnInit(): void { }

  close(): void {
    this.transferFromService.closeTransferFromAccountModal();
  }
}
