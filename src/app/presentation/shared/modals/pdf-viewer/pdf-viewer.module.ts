import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerComponent } from './pdf-viewer.component';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    PdfViewerComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ]
})
export class PdfViewerModule { }
