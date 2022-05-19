import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DownloadTemplateComponent } from 'src/app/presentation/shared/modals/download-template/download-template.component';
import { TemplateFormatComponent } from 'src/app/presentation/shared/modals/download-template/template-format/template-format.component';
import { DownloadTemplateModal } from "src/app/core/domain/download-template.model";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadTemplateService {

  data = new Subject<DownloadTemplateModal>();
  public defaultData: DownloadTemplateModal;

  dialogRefDownload: any;
  dialogRefTemplateFormat: any;

  constructor(private readonly dialog: MatDialog) { }

  openDownload(data: DownloadTemplateModal[] | null) {
    this.dialogRefDownload =  this.dialog.open<DownloadTemplateComponent, DownloadTemplateModal[]>(DownloadTemplateComponent, {
      disableClose: true,
      data
    });
    return this.dialogRefDownload;
  }

  // set(input: any): void {
  //   this.defaultData = { ...this.defaultData, ...input };
  //   this.data.next(this.defaultData);
  // }

  select(type: any): void {
    this.defaultData = type;
    this.data.next(type);
    console.log(this.defaultData, "defaultData");
  }

  get default(): DownloadTemplateModal {
    return this.defaultData
  }

  openTemplate(data: DownloadTemplateModal[] | null) {
    this.dialogRefTemplateFormat =  this.dialog.open<TemplateFormatComponent, DownloadTemplateModal[]>(TemplateFormatComponent, {
      disableClose: true,
      data
    });
    return this.dialogRefTemplateFormat;
  }

  closeDownload() {
    this.dialogRefDownload.close()
  }

  closeTemplate() {
    this.dialogRefTemplateFormat.close()
  }
}
