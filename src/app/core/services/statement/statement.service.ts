import { StatementOptionModalComponent } from './../../../presentation/shared/modals/statement-option-modal/statement-option-modal.component';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  constructor(private readonly dialog: MatDialog) { }

  open(data?: any[]): void {
    this.dialog.open<StatementOptionModalComponent, any[]>(StatementOptionModalComponent, {
      width: '700px',
      disableClose: false,
      data
    });
  }

}
