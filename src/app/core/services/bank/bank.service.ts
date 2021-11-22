import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { BankModel } from '../../domain/bank.model';
import { BankModalComponent } from './../../../presentation/shared/modals/bank-modal/bank-modal.component';

@Injectable()
export class BankService {
  selected = new Subject<BankModel>();
  private data: BankModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: BankModel[]) {
    return this.dialog.open<BankModalComponent, BankModel[]>(BankModalComponent, {
      maxWidth: '500px',
      disableClose: true,
      data
    });
  }

  get default(): BankModel {
    return this.data;
  }

  select(bank: BankModel): void {
    this.data = bank;
    this.selected.next(this.data)
  }
}
