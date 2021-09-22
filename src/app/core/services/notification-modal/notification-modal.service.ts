import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PreLoginModal } from '../../domain/pre-login-modal.model';
import { NotificationModalComponent } from '../../../presentation/shared/modals/notification-modal/notification-modal.component';

@Injectable()
export class NotificationModalService {

  constructor(private readonly dialog: MatDialog) { }

  open(data: PreLoginModal): void {
    this.dialog.open<NotificationModalComponent, PreLoginModal>(NotificationModalComponent, {
      disableClose: true,
      data
    });
  }
}
