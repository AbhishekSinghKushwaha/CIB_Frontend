import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EazzyFxGenerateDealModalComponent } from '../eazzy-fx-generate-deal-modal.component';

@Injectable()
export class EazzyFxGenerateDealModalService {
  constructor(private readonly matDialog: MatDialog) {}

  open(): Observable<undefined> {
    return this.matDialog
      .open<EazzyFxGenerateDealModalComponent>(
        EazzyFxGenerateDealModalComponent,
        {}
      )
      .afterClosed();
  }
}
