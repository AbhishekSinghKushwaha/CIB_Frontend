import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportingDocumentsUploadComponent } from './supporting-documents-upload.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { UploadConfirmationModule } from '../upload-confirmation/upload-confirmation.module';
import { PdfViewerModalModule } from '../pdf-viewer-modal/pdf-viewer-modal.module';

@NgModule({
  declarations: [SupportingDocumentsUploadComponent],
  imports: [CommonModule, MatStyleModule, UploadConfirmationModule, PdfViewerModalModule],
  exports: [SupportingDocumentsUploadComponent],
  providers: [],
})
export class SupportingDocumentsUploadModule {}
