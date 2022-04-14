import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DropdownListModalComponent } from 'src/app/presentation/shared/modals/dropdown-list-modal/dropdown-list-modal.component';
import { DropdownModal } from '../../domain/prompt.model';


@Injectable({ providedIn: 'root' })
export class SharedService<T> {
  dropdownListModalRef: MatDialogRef<DropdownListModalComponent<T>>;

  constructor(private readonly dialog: MatDialog) { }

  openDropdownModal(data: DropdownModal<T>) {
    this.dropdownListModalRef = this.dialog.open<DropdownListModalComponent<T>>(
      DropdownListModalComponent,
      {
        maxWidth: '82vw',
        disableClose: true,
        autoFocus: true,
        data,
      }
    );
    return this.dropdownListModalRef;
  }

  closeDropdown(data?: T): void {
    this.dropdownListModalRef.close(data);
  }
}