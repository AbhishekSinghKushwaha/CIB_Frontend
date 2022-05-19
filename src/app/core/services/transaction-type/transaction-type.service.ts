import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectTransactionTypeComponent } from 'src/app/presentation/shared/modals/select-transaction-type/select-transaction-type.component';
import { TransferTypeDTO } from "../../domain/transfer.models";

@Injectable({
  providedIn: 'root'
})
export class TransactionTypeService {

  selected = new Subject<{ key: string; value: string }>();
  private data: TransferTypeDTO;
  dialogRef: any;

  constructor(private readonly dialog: MatDialog) {}

  open(data: any): void {
    this.dialogRef = this.dialog.open<SelectTransactionTypeComponent>(
      SelectTransactionTypeComponent,
      {
        disableClose: true,
        data,
      }
    );
  }

  get default(): any {
    return this.data;
  }

  select(type: any): void {
    this.data = type;
    this.selected.next(type);
  }

  close(): void {
    this.dialogRef.close();
  }
}
