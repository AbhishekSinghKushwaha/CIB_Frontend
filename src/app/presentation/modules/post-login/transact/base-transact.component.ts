import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { SnackbarComponent } from 'src/app/presentation/shared/components/snackbar/snackbar.component';

export class BaseTransactComponent {
  accounts: FromAccount[] = [];
  notify: MatSnackBarRef<SnackbarComponent>;

  constructor(protected snackbar: MatSnackBar) { }

  public generateReference(): string {
    return Math.floor(new Date().getTime() * Math.random() * 100)
      .toString()
      .substring(0, 12);
  }

  public notifyError(errorMessage: any) {
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: errorMessage,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  public dismissNotify() {
    this.snackbar.dismiss()
  }

}
