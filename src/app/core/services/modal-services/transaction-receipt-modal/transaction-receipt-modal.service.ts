import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { TransactionReceiptModalComponent } from "src/app/presentation/shared/modals/transaction-receipt-modal/transaction-receipt-modal.component";

@Injectable({
  providedIn: "root",
})
export class TransactionReceiptModalService {
  modalRef: MatDialogRef<TransactionReceiptModalComponent, any>;

  constructor(private readonly dialog: MatDialog) {}

  open(data: any) {
    this.modalRef = this.dialog.open<TransactionReceiptModalComponent>(
      TransactionReceiptModalComponent,
      {
        maxWidth: "32vw",
        disableClose: true,
        data,
      }
    );
    return this.modalRef;
  }

  close(): void {
    this.modalRef.close();
  }
}
