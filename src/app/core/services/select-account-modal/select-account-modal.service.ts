import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { SelectAccountModalComponent } from 'src/app/presentation/shared/modals/select-account-modal/select-account-modal.component';
import { SelectAccountModel } from '../../domain/select-account.model';
import { FromAccount } from '../../domain/transfer.models';

@Injectable()
export class SelectAccountModalService {
  dialogRef: any;
  selected = new Subject<FromAccount>();
  private data: FromAccount;

  constructor(private readonly dialog: MatDialog) { }

  open(data: FromAccount[]): void {
    const dialogRef = this.dialog.open<SelectAccountModalComponent, FromAccount[]>(SelectAccountModalComponent, {
      disableClose: true,
      data
    });
  }

  select(account: FromAccount): void {
    this.data=account;
    this.selected.next(this.data)
  }

  get default(): FromAccount {
    return this.data;
  }

}
