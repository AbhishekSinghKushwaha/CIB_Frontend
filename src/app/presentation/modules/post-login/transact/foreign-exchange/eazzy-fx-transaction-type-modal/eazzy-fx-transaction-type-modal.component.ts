import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-eazzy-fx-transaction-type-modal',
  templateUrl: './eazzy-fx-transaction-type-modal.component.html',
  styleUrls: ['./eazzy-fx-transaction-type-modal.component.scss'],
})
export class EazzyFxTransactionTypeModalComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<EazzyFxTransactionTypeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public transactionType: 'sell' | 'buy'
  ) {}

  close() {
    this.dialogRef.close();
  }

  selectTransactionType(transactionType: 'sell' | 'buy'): void {
    this.transactionType = transactionType;

    this.dialogRef.close(transactionType);
  }
}
