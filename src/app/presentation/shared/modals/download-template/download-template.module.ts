import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadTemplateComponent } from './download-template.component';
import { TemplateFormatComponent } from './template-format/template-format.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { DownloadTemplateService } from 'src/app/core/services/download-template/download-template.service';



@NgModule({
  declarations: [
    DownloadTemplateComponent,
    TemplateFormatComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    DownloadTemplateComponent,
    TemplateFormatComponent 
  ],
  providers: [DownloadTemplateService],
})
export class DownloadTemplateModule { }
