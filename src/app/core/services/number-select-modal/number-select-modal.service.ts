import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NumberSelectModalComponent } from 'src/app/presentation/shared/modals/number-select-modal/number-select-modal.component';

@Injectable()
export class NumberSelectModalService {
  selected = new Subject<string>();
  private data: string;

  constructor(private readonly dialog: MatDialog) { }

  open(data: string[]): void {
    this.dialog.open<NumberSelectModalComponent, string[]>(NumberSelectModalComponent, {
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
}
