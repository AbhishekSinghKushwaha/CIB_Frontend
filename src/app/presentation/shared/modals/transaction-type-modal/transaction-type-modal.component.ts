import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionTypeModalService } from 'src/app/core/services/transaction-type-modal/transaction-type-modal.service';

@Component({
  selector: 'app-transaction-type-modal',
  templateUrl: './transaction-type-modal.component.html',
  styleUrls: ['./transaction-type-modal.component.scss'],
})
export class TransactionTypeModalComponent implements OnInit {
  selected: any;

  constructor(
    private readonly dialogRef: MatDialogRef<TransactionTypeModalComponent>,
    private readonly transactionTypeModalService: TransactionTypeModalService,
    @Inject(MAT_DIALOG_DATA) public data: any[]
  ) {
    this.selected = this.transactionTypeModalService.default;
    this.transactionTypeModalService.selected.subscribe(
      (x) => (this.selected = x)
    );
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close(true);
  }
}
