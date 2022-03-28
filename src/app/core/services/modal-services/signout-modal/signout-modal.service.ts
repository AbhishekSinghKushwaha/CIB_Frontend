import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignOutModal } from '../../../domain/sign-out-modal.model';
import { SignoutModalComponent } from '../../../../presentation/shared/modals/signout-modal/signout-modal.component';

@Injectable({
  providedIn: 'root',
})
export class SignoutModalService {
  constructor(private readonly dialog: MatDialog) {}

  open(data: SignOutModal): void {
    this.dialog.open<SignoutModalComponent, SignOutModal>(
      SignoutModalComponent,
      {
        disableClose: true,
        data,
      }
    );
  }
}
