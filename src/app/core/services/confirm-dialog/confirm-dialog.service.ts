import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take, map } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/presentation/shared/modals/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../domain/confirm-dialog.model';

@Injectable()
export class ConfirmDialogService {
  dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(private dialog: MatDialog) { }

  public open(options: ConfirmDialogModel) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '22vw',
      disableClose: true,
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText
      }
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
    ));
  }

}
