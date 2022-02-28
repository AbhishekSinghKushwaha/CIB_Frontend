import { Component, Input, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { mockData } from "src/app/core/utils/constants/mockdata.constants";
import { MobileMoneyNewRecipientComponent } from "../mobile-money-new-recipient/mobile-money-new-recipient.component";

@Component({
  selector: "app-mobile-operators-modal",
  templateUrl: "./mobile-operators-modal.component.html",
  styleUrls: ["./mobile-operators-modal.component.scss"],
})
export class MobileOperatorsModalComponent implements OnInit {
  @Input() transferType: string;

  operators = mockData.mobileOperators;

  isChecked: boolean = false;

  selected: any;

  visibility: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<MobileOperatorsModalComponent>,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  select(i: number) {
    this.selected = this.operators[i];
    this.visibility = false;
    this.openMobileMoneyNewRecipientModal();
  }

  openMobileMoneyNewRecipientModal() {
    const modal = this.dialog.open(MobileMoneyNewRecipientComponent, {
      disableClose: true,
      data: this.selected,
    });

    modal.afterClosed().subscribe((x) => {});
  }
}
