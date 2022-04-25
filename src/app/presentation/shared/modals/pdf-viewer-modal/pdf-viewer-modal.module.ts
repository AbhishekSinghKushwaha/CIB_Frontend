import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModalComponent } from './pdf-viewer-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    PdfViewerModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ]
})
export class PdfViewerModalModule { }
