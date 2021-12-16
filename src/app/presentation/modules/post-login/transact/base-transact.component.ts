import { MatSnackBar } from '@angular/material/snack-bar';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { SnackbarComponent } from 'src/app/presentation/shared/components/snackbar/snackbar.component';

export class BaseTransactComponent {
  accounts: FromAccount[] = [];
  constructor(protected snackbar: MatSnackBar) {}

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
}
