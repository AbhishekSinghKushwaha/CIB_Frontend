import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SelectAccountSendToComponent } from 'src/app/presentation/shared/modals/select-account-send-to/select-account-send-to.component';
import { FromAccount } from '../../domain/transfer.models';


@Injectable({
  providedIn: 'root'
})
export class SelectAccountSendtoService {

  selected = new Subject<FromAccount>();

  constructor(private readonly dialog: MatDialog) { }

  open(data: FromAccount[]): void {
    this.dialog.open<SelectAccountSendToComponent, FromAccount[]>(SelectAccountSendToComponent, {
      disableClose: true,
      data
    });
  }

  selectAccountSendTo(accountSendTo: FromAccount): void {
    this.selected.next(accountSendTo)
  }
}
