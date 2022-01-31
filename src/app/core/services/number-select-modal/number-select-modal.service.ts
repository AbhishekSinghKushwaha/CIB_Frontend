import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NumberSelectModalComponent } from 'src/app/presentation/shared/modals/number-select-modal/number-select-modal.component';

@Injectable()
export class NumberSelectModalService {
  selected = new Subject<string>();
  private data: string;
  dialogRef: MatDialogRef<NumberSelectModalComponent, any>

  constructor(private readonly dialog: MatDialog) { }

  open(data: number) {
    return this.dialogRef = this.dialog.open<NumberSelectModalComponent, number>(NumberSelectModalComponent, {
      maxWidth: '400px',
      disableClose: true,
      data,
    });
  }

  select(item: string): void {
    this.data = item;
    this.selected.next(this.data);
  }

  get default(): string {
    return this.data;
  }

  close() {
    this.dialogRef.close();
  }
}
