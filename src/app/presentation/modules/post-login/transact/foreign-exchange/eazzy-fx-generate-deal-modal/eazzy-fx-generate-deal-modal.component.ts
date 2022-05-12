import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eazzy-fx-generate-deal-modal',
  templateUrl: './eazzy-fx-generate-deal-modal.component.html',
  styleUrls: ['./eazzy-fx-generate-deal-modal.component.scss'],
})
export class EazzyFxGenerateDealModalComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<EazzyFxGenerateDealModalComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
