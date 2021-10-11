import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { SelectAccountModalComponent } from 'src/app/presentation/shared/modals/select-account-modal/select-account-modal.component';
import { SelectAccountModel } from '../../domain/select-account.model';
import { SelectAccountSendToComponent } from 'src/app/presentation/shared/modals/select-account-send-to/select-account-send-to.component';

@Injectable()
export class SelectAccountModalService {

  selectedAccount = new Subject<SelectAccountModel>();
  selectedAccountSendTo = new Subject<SelectAccountModel>();

  constructor(private readonly dialog: MatDialog) { }

  open(data: SelectAccountModel[]): void {
    this.dialog.open<SelectAccountModalComponent, SelectAccountModel[]>(SelectAccountModalComponent, {
      disableClose: true,
      data
    });
  }

  openSendTo(data: SelectAccountModel[]): void {
    this.dialog.open<SelectAccountSendToComponent, SelectAccountModel[]>(SelectAccountSendToComponent, {
      disableClose: true,
      data
    });
  }

  selectAccount(account: SelectAccountModel): void {
    this.selectedAccount.next(account)
  }

  selectAccountSendTo(accountSendTo: SelectAccountModel): void {
    this.selectedAccountSendTo.next(accountSendTo)
  }

}
