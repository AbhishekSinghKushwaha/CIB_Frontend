import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable, Subject } from "rxjs";
import { TransferFromModalComponent } from "src/app/presentation/shared/modals/transfer-from-modal/transfer-from-modal.component";
import { FromAccount } from "../../domain/transfer.models";
import { StateService } from "../state/state.service";
interface TransferFromState {
  transferFromAccount: FromAccount;
}

const initialTransferFromState: TransferFromState = {
  transferFromAccount: {},
};
@Injectable({
  providedIn: "root",
})
export class TransferFromService extends StateService<TransferFromState> {
  transferFromAmount$: Observable<FromAccount> = this.select(
    (state) => state.transferFromAccount
  );
  transferFromModalRef: MatDialogRef<TransferFromModalComponent, FromAccount>;

  constructor(private readonly dialog: MatDialog) {
    super(initialTransferFromState);
  }

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

  // Select account to transfer from
  setTransferFromAccount(account: FromAccount): void {
    this.setState({ transferFromAccount: account });
  }

  // Close transfer from account modal
  closeTransferFromAccountModal(): void {
    // this.selectedTransferFromAccount.next(this.transferFromData);
    this.transferFromModalRef.close();
  }
}
