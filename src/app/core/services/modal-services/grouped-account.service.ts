import { ProfileFromModalComponent } from './../../../presentation/shared/modals/profile-from-modal/profile-from-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GroupedAccountModel } from './../../domain/account.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupedAccountService {
  selectedGroupedAccount = new Subject<GroupedAccountModel>();
  groupedAccountModalRef: MatDialogRef<ProfileFromModalComponent, GroupedAccountModel>
  private accountData: GroupedAccountModel;

  constructor(private readonly dialog: MatDialog) { }

  openSelectAccountModal(
    data: GroupedAccountModel[]
  ): MatDialogRef<ProfileFromModalComponent, any> {
    this.groupedAccountModalRef = this.dialog.open<ProfileFromModalComponent, any>(ProfileFromModalComponent, {
      disableClose: false,
      data
    });
    return this.groupedAccountModalRef;
  }

  closeSelectAccountModal(): void {
    this.groupedAccountModalRef.close();
  }

}
