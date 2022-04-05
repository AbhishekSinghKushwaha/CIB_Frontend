import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectTransactionTypeComponent } from 'src/app/presentation/shared/modals/select-transaction-type/select-transaction-type.component';
import { TransactionTypeModel } from '../../domain/transaction-type.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {

  selected = new Subject<TransactionTypeModel>();
  private data: TransactionTypeModel;
  dialogRef: any;

  constructor(private readonly dialog: MatDialog) {}

  open(data: TransactionTypeModel[]): void {
    this.dialogRef = this.dialog.open<SelectTransactionTypeComponent, TransactionTypeModel[]>(
      SelectTransactionTypeComponent,
      {
        disableClose: true,
        data,
      }
    );
  }

  get default(): TransactionTypeModel {
    return this.data;
  }

  select(type: TransactionTypeModel): void {
    this.data = type;
    this.selected.next(type);
  }

  close(): void {
    this.dialogRef.close();
  }
}
