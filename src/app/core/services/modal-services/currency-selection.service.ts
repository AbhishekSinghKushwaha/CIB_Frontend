import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CurrencySelectionModal } from '../../domain/currency-selection.model';
import { MatDialog } from '@angular/material/dialog';
import { CurrencySelectionComponent } from 'src/app/presentation/shared/modals/currency-selection/currency-selection.component';
import { CurrencyModel } from '../../domain/transfer.models';

@Injectable({ providedIn: 'root' })
export class CurrencySelectionService {
  selected = new Subject<CurrencyModel>();
  private data: CurrencyModel;

  constructor(private readonly dialog: MatDialog) {}

  open(data: CurrencyModel[]): void {
    this.dialog.open<CurrencySelectionComponent, CurrencyModel[]>(
      CurrencySelectionComponent,
      {
        disableClose: true,
        data,
      }
    );
  }

  get default(): CurrencyModel {
    return this.data;
  }

  select(currency: CurrencyModel): void {
    this.data = currency;
    this.selected.next(currency);
  }
}
