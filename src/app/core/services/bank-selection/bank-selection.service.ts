import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { BankSelectionComponent } from 'src/app/presentation/shared/modals/bank-selection/bank-selection.component';
import { BankSelectionModel } from '../../domain/bank-selection.model';

@Injectable({
  providedIn: 'root'
})
export class BankSelectionService {

  selected = new Subject<BankSelectionModel>();
  private data:BankSelectionModel;


  constructor(private readonly dialog: MatDialog) { }

  open(data: BankSelectionModel[]): void {
    this.dialog.open<BankSelectionComponent, BankSelectionModel[]>(BankSelectionComponent, {
      disableClose: false,
      data
    });
  }

  select(input: BankSelectionModel): void {
    this.data = input;
    this.selected.next(this.data)
  }

  get default(): BankSelectionModel {
    return this.data;
  }

}
