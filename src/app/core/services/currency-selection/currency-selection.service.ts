import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CurrencySelectionModal } from '../../domain/currency-selection.model';
import { MatDialog } from '@angular/material/dialog';
import { CurrencySelectionComponent } from 'src/app/presentation/shared/modals/currency-selection/currency-selection.component';

@Injectable()
export class CurrencySelectionService {
  selected = new Subject<CurrencySelectionModal>();
  private data:CurrencySelectionModal;

  constructor(private readonly dialog: MatDialog) { }

  open(data: CurrencySelectionModal[]): void {
    this.dialog.open<CurrencySelectionComponent, CurrencySelectionModal[]>(CurrencySelectionComponent, {
      disableClose: true,
      data
    });
  }

  get default():CurrencySelectionModal{
    return this.data;
  }

  select(account: CurrencySelectionModal): void {
    this.data=account;
    this.selected.next(account)
  }
}
