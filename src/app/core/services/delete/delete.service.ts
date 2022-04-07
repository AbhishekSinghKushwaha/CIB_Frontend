import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModal } from 'src/app/core/domain/delete.modal';
import { DeleteComponent } from 'src/app/presentation/shared/modals/delete/delete.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  dialogRef: any;

  constructor(private readonly dialog: MatDialog) { }

  open(data: DeleteModal) {
    this.dialogRef =  this.dialog.open<DeleteComponent, DeleteModal>(DeleteComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  }

  close() {
    this.dialogRef.close()
  }
}
