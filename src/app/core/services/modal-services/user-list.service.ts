import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { UserListModalComponent } from 'src/app/presentation/shared/modals/user-list-modal/user-list-modal.component';
import { UserListModel } from '../../domain/user.model';

@Injectable()
export class UserListService {
  modalRef: MatDialogRef<UserListModalComponent, any>;

  constructor(private readonly dialog: MatDialog) { }

  open(data: UserListModel[]) {
    this.modalRef = this.dialog.open<UserListModalComponent, UserListModel[]>(
      UserListModalComponent,
      {
        maxWidth: '82vw',
        disableClose: true,
        data,
      }
    );
    return this.modalRef;
  }


  close(data?: UserListModel): void {
    this.modalRef.close(data);
  }
}
