import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EazzyFxTransactionTypeModalComponent } from '../eazzy-fx-transaction-type-modal.component';

@Injectable()
export class EazzyFxTransactionTypeModalService {
  constructor(private readonly matDialog: MatDialog) {}

  open(
    transactionType: 'sell' | 'buy' | undefined
  ): Observable<'sell' | 'buy' | undefined> {
    return this.matDialog
      .open<EazzyFxTransactionTypeModalComponent>(
        EazzyFxTransactionTypeModalComponent,
        {
          data: transactionType,
        }
      )
      .afterClosed();
  }
}
