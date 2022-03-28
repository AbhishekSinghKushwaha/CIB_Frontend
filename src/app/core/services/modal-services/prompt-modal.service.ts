import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PromptModalComponent } from 'src/app/presentation/shared/modals/prompt-modal/prompt-modal.component';
import { PromptModel } from '../../domain/prompt.model';

@Injectable({
  providedIn: 'root',
})
export class PromptModalService {
  modalRef: MatDialogRef<PromptModalComponent, any>;

  constructor(private readonly dialog: MatDialog) {}

  open(data: PromptModel) {
    this.modalRef = this.dialog.open<PromptModalComponent, any>(
      PromptModalComponent,
      {
        maxWidth: '50vw',
        disableClose: true,
        data,
      }
    );
    return this.modalRef;
  }

  close(data: string | undefined): void {
    this.modalRef.close(data);
  }
}
