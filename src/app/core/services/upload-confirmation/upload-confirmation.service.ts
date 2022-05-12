import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadConfirmationComponent } from 'src/app/presentation/shared/modals/upload-confirmation/upload-confirmation.component';


@Injectable({
  providedIn: 'root'
})
export class UploadConfirmationService {

  dialogRef: any;

  constructor(private readonly dialog: MatDialog) { }

  open() {
    this.dialogRef =  this.dialog.open<UploadConfirmationComponent>(UploadConfirmationComponent, {
      disableClose: true,
    });
    return this.dialogRef;
  }

  close() {
    this.dialogRef.close()
  }
}
