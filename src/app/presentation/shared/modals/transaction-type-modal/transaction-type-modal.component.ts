import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionTypeModel } from 'src/app/core/domain/transaction-type.model';
import { TransactionTypeModalService } from 'src/app/core/services/transaction-type-modal/transaction-type-modal.service';

@Component({
  selector: 'app-transaction-type-modal',
  templateUrl: './transaction-type-modal.component.html',
  styleUrls: ['./transaction-type-modal.component.scss']
})
export class TransactionTypeModalComponent implements OnInit {
  selected: TransactionTypeModel[];

  constructor(
    private readonly dialogRef: MatDialogRef<TransactionTypeModalComponent>,
    private readonly transactionTypeModalService: TransactionTypeModalService,
    @Inject(MAT_DIALOG_DATA) public data: TransactionTypeModel[],
  ) {
    this.selected = this.transactionTypeModalService.default;
    this.transactionTypeModalService.selected.subscribe((x) => this.selected = x);
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

  isChecked(id: number): boolean {
    return this.selected ? this.selected.some(value => value.id === id) : false;
  }

}
