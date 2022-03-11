import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { TransferFromModalComponent } from "src/app/presentation/shared/modals/transfer-from-modal/transfer-from-modal.component";
import { FromAccount } from "../../domain/transfer.models";

@Injectable({
  providedIn: "root",
})
export class TransferFromService {
  selectedTransferFromAccount = new Subject<FromAccount>();
  transferFromModalRef: MatDialogRef<TransferFromModalComponent, FromAccount>;
  private transferFromData: FromAccount;

  constructor(private readonly dialog: MatDialog) {}

  // Open Transfer From Modal
  openTransferFromModal(
    data: FromAccount[]
  ): MatDialogRef<TransferFromModalComponent> {
    this.transferFromModalRef = this.dialog.open<
      TransferFromModalComponent,
      FromAccount[]
    >(TransferFromModalComponent, {
      disableClose: true,
      data,
    });
    return this.transferFromModalRef;
  }

  // Get the default data
  get defaulTransferFromAccount(): FromAccount {
    return this.transferFromData;
  }

  // Select account to transfer from
  selectTransferFromAccount(account: any): void {
    this.transferFromData = account;
    this.selectedTransferFromAccount.next(account);
  }

  // Close transfer from account modal
  closeTransferFromAccountModal(): void {
    // this.selectedTransferFromAccount.next(this.transferFromData);
    this.transferFromModalRef.close();
  }
}
