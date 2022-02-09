import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPaymentModalService {
  confirmed = new Subject<boolean>()
  constructor(private readonly dialog: MatDialog) { }

  open(data: any): void {
    this.dialog.open<ConfirmPaymentModalService>(ConfirmPaymentModalService, {
      disableClose: true,
      data
    });
  }

  // selectAccountSendTo(accountSendTo: FromAccount): void {
  //   this.selected.next(accountSendTo)
  // }
}
