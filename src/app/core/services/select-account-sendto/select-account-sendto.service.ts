import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SelectAccountModel } from '../../domain/select-account.model';
import { SelectAccountSendToComponent } from 'src/app/presentation/shared/modals/select-account-send-to/select-account-send-to.component';


@Injectable({
  providedIn: 'root'
})
export class SelectAccountSendtoService {

  selectedAccountSendTo = new Subject<SelectAccountModel>();

  constructor(private readonly dialog: MatDialog) { }

  open(data: SelectAccountModel[]): void {
    this.dialog.open<SelectAccountSendToComponent, SelectAccountModel[]>(SelectAccountSendToComponent, {
      disableClose: true,
      data
    });
  }

  selectAccountSendTo(accountSendTo: SelectAccountModel): void {
    this.selectedAccountSendTo.next(accountSendTo)
  }
}
