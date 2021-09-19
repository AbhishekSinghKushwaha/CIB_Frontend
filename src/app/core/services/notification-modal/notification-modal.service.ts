import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPreLoginModal } from './../../interfaces/pre-login-modal.interface';
import { NotificationModalComponent } from '../../../presentation/shared/components/notification-modal/notification-modal.component';

@Injectable()
export class NotificationModalService {

  constructor(private readonly dialog: MatDialog) { }

  open(data: IPreLoginModal): void {
    this.dialog.open<NotificationModalComponent, IPreLoginModal>(NotificationModalComponent, {
      disableClose: true,
      data
    });
  }
}
