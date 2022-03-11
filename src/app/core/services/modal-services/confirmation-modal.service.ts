import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/presentation/shared/modals/confirmation-modal/confirmation-modal.component';
import { ConfirmationModel } from '../../domain/confirmation.model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationModalService {
  modalRef: MatDialogRef<ConfirmationModalComponent, any>;

  constructor(private readonly dialog: MatDialog) { }

  open(data: ConfirmationModel) {
    this.modalRef = this.dialog.open<ConfirmationModalComponent, any>(
      ConfirmationModalComponent,
      {
        maxWidth: '50vw',
        disableClose: true,
        data,
      }
    );
    return this.modalRef;
  }

  close(data: boolean): void {
    this.modalRef.close(data)
  }
}
