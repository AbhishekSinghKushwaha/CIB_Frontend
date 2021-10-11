import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { SelectAccountModalComponent } from 'src/app/presentation/shared/modals/select-account-modal/select-account-modal.component';
import { SelectAccountModel } from '../../domain/select-account.model';

@Injectable()
export class SelectAccountModalService {
  selected = new Subject<SelectAccountModel>();
  private data: SelectAccountModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: SelectAccountModel[]): void {
    this.dialog.open<SelectAccountModalComponent, SelectAccountModel[]>(SelectAccountModalComponent, {
      disableClose: true,
      data
    });
  }

  select(account: SelectAccountModel): void {
    this.data=account;
    this.selected.next(this.data)
  }

  get default(): SelectAccountModel {
    return this.data;
  }
}
