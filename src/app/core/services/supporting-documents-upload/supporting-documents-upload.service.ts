import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SupportingDocumentsUploadComponent } from '../../../presentation/shared/modals/supporting-documents-upload/supporting-documents-upload.component';


@Injectable({
  providedIn: 'root'
})
export class SupportingDocumentsUploadService {

  constructor(private readonly dialog: MatDialog) { }

  open(): void {
    this.dialog.open<SupportingDocumentsUploadComponent>(SupportingDocumentsUploadComponent, {
      disableClose: true,
    });
  }
}
