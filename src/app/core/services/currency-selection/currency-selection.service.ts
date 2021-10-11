import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CurrencySelectionModal } from '../../domain/currency-selection.model';
import { MatDialog } from '@angular/material/dialog';
import { CurrencySelectionComponent } from 'src/app/presentation/shared/modals/currency-selection/currency-selection.component';

@Injectable()
export class CurrencySelectionService {
  selected = new Subject<CurrencySelectionModal>();

  constructor(private readonly dialog: MatDialog) { }

  open(data: CurrencySelectionModal[]): void {
    this.dialog.open<CurrencySelectionComponent, CurrencySelectionModal[]>(CurrencySelectionComponent, {
      disableClose: true,
      data
    });
  }

  select(account: CurrencySelectionModal): void {
    this.selected.next(account)
  }
}
