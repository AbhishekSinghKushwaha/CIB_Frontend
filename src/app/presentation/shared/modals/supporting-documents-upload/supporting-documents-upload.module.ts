import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportingDocumentsUploadComponent } from './supporting-documents-upload.component';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [SupportingDocumentsUploadComponent],
  imports: [CommonModule, MatStyleModule],
  exports: [SupportingDocumentsUploadComponent],
  providers: [],
})
export class SupportingDocumentsUploadModule {}
