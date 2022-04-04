import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionTypeService } from 'src/app/core/services/transaction-type/transaction-type.service';
import { TransactionTypeModel } from 'src/app/core/domain/transaction-type.model';

@Component({
  selector: 'app-select-transaction-type',
  templateUrl: './select-transaction-type.component.html',
  styleUrls: ['./select-transaction-type.component.scss']
})
export class SelectTransactionTypeComponent implements OnInit {
  selected: TransactionTypeModel;

  constructor(
    private readonly dialogRef: MatDialogRef<SelectTransactionTypeComponent>,
    private readonly transactionTypeService: TransactionTypeService,
    @Inject(MAT_DIALOG_DATA) public data: TransactionTypeModel[]
  ) {
    this.selected = this.transactionTypeService.default;
    this.transactionTypeService.selected.subscribe(
      (x) => (this.selected = x)
    );
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close(true);
  }

}
