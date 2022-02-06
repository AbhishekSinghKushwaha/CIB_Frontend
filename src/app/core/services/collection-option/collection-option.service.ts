import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CollectionOptionModalComponent } from 'src/app/presentation/shared/modals/collection-option-modal/collection-option-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CollectionOptionService {
  private data: string;
  dialogRef: MatDialogRef<CollectionOptionModalComponent, any>

  constructor(private readonly dialog: MatDialog) { }

  open(data: string[]) {
    return this.dialogRef = this.dialog.open<CollectionOptionModalComponent, string[]>(CollectionOptionModalComponent, {
      maxWidth: '400px',
      disableClose: true,
      data,
    });
  }

  select(item: string): void {
  }

  get default(): string {
    return this.data;
  }

  close() {
    this.dialogRef.close();
  }
}
