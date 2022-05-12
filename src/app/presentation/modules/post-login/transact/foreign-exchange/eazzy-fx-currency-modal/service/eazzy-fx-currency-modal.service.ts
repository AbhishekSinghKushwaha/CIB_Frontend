import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EazzyFxCurrencyModalComponent } from '../eazzy-fx-currency-modal.component';

@Injectable()
export class EazzyFxCurrencyModalService {
  constructor(private readonly matDialog: MatDialog) {}

  open(data: any): Observable<number | undefined> {
    return this.matDialog
      .open<EazzyFxCurrencyModalComponent>(EazzyFxCurrencyModalComponent, {
        width: '450px',
        data,
      })
      .afterClosed();
  }
}
