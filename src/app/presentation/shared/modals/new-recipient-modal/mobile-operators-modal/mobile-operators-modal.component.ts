import { Component, Inject, Input, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MobileWallet } from "src/app/core/domain/transfer.models";
import { MobileWalletsService } from "src/app/core/services/modal-services/mobile-wallets.service";
import { mockData } from "src/app/core/utils/constants/mockdata.constants";
import { MobileMoneyNewRecipientComponent } from "../mobile-money-new-recipient/mobile-money-new-recipient.component";

export interface MobileOperatorsModalData {
  hideRecipient: boolean;
}
@Component({
  selector: "app-mobile-operators-modal",
  templateUrl: "./mobile-operators-modal.component.html",
  styleUrls: ["./mobile-operators-modal.component.scss"],
})
export class MobileOperatorsModalComponent implements OnInit {
  @Input() transferType: string;

  isChecked: boolean = false;

  selected: any;

  visibility: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<MobileOperatorsModalComponent>,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: MobileWallet[],
    private mobileWalletsService: MobileWalletsService
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  select(i: number) {
    this.selected = this.data[i];
    this.mobileWalletsService.selectWallet(this.selected);
  }

  openMobileMoneyNewRecipientModal() {
    const modal = this.dialog.open(MobileMoneyNewRecipientComponent, {
      disableClose: true,
      data: this.selected,
    });

    modal.afterClosed().subscribe((x) => {});
  }
}
