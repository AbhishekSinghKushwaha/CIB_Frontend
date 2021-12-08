import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatementListModalComponent } from 'src/app/presentation/shared/modals/statement-modal/statement-list-modal/statement-list-modal.component';

@Injectable({
  providedIn: 'root'
})
export class StatementListService {

  constructor(private readonly dialog: MatDialog) { }

  open(data?: any[]): void {
    this.dialog.open<StatementListModalComponent, any[]>(StatementListModalComponent, {
      width: '1000px',
      disableClose: false,
      data
    });
  }

}
