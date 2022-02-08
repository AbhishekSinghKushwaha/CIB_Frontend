import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LogoutConfirmationModalComponent } from 'src/app/presentation/shared/components/logout-confirmation-modal/logout-confirmation-modal.component';
import { LogoutWarningModalComponent } from 'src/app/presentation/shared/components/logout-warning-modal/logout-warning-modal.component';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  logoutWarningModalRef: MatDialogRef<LogoutWarningModalComponent, any>;
  logoutConfirmationModalRef: MatDialogRef<LogoutConfirmationModalComponent, any>;

  constructor(private readonly dialog: MatDialog) { }

  openLogoutWarning() {
    this.logoutWarningModalRef = this.dialog.open<LogoutWarningModalComponent, any>(
      LogoutWarningModalComponent,
      {
        maxWidth: '22vw',
        disableClose: true,
      }
    );
    return this.logoutWarningModalRef;
  }

  openLogoutConfirmation() {
    this.logoutConfirmationModalRef = this.dialog.open<LogoutConfirmationModalComponent, any>(
      LogoutConfirmationModalComponent,
      {
        maxWidth: '22vw',
        disableClose: true,
      }
    );
    return this.logoutConfirmationModalRef;
  }

  closeLogoutWarning() {
    this.logoutWarningModalRef.close();
  }


  closeLogoutConfirmation() {
    this.logoutConfirmationModalRef.close()
  }
}
