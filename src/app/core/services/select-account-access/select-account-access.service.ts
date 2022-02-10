import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SelectAccountAccessComponent } from 'src/app/presentation/shared/modals/select-account-access/select-account-access.component';
import { FromAccount } from '../../domain/transfer.models';

@Injectable()
export class SelectAccountAccessService {
  dialogRef: any;
  selected = new Subject<FromAccount[]>();
  private data: FromAccount[];

  constructor(private readonly dialog: MatDialog) { }

  open(data: FromAccount[]): void {
    const dialogRef = this.dialog.open<SelectAccountAccessComponent, FromAccount[]>(SelectAccountAccessComponent, {
      disableClose: true,
      data
    });
  }

  select(accounts: FromAccount[]): void {
    this.selected.next(accounts)
  }

  get default(): FromAccount[] {
    return this.data;
  }

}
