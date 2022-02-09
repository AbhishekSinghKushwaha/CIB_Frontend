import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatementDetailModalComponent } from 'src/app/presentation/shared/modals/statement-modal/statement-detail-modal/statement-detail-modal.component';

@Injectable({
  providedIn: 'root'
})
export class StatementDetailService {

  constructor(private readonly dialog: MatDialog) { }

  open(data?: any[]): void {
    this.dialog.open<StatementDetailModalComponent, any[]>(StatementDetailModalComponent, {
      width: '800px',
      disableClose: false,
      data
    });
  }

}
