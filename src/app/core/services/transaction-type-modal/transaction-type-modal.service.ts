import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { TransactionTypeModalComponent } from 'src/app/presentation/shared/modals/transaction-type-modal/transaction-type-modal.component';
import { TransactionTypeModel } from '../../domain/transfer.models';

@Injectable()
export class TransactionTypeModalService {
  selected = new Subject<TransactionTypeModel>();
  private data: TransactionTypeModel;

  constructor(private readonly dialog: MatDialog) {}

  open(data: any) {
    return this.dialog.open<TransactionTypeModalComponent>(
      TransactionTypeModalComponent,
      {
        maxWidth: '500px',
        disableClose: true,
        data,
      }
    );
  }

  get default(): TransactionTypeModel {
    return this.data;
  }

  select(account: any): void {
    this.data = account;
    this.selected.next(account);
  }
}
