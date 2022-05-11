import { Component, OnInit, Inject } from '@angular/core';
import { DownloadTemplateService } from 'src/app/core/services/download-template/download-template.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DownloadTemplateModal } from 'src/app/core/domain/download-template.model';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';

@Component({
  selector: 'app-download-template',
  templateUrl: './download-template.component.html',
  styleUrls: ['./download-template.component.scss']
})
export class DownloadTemplateComponent implements OnInit {
  visibility: boolean = false;

  constructor(
    private readonly dialogRef: MatDialogRef<DownloadTemplateComponent>,
    private readonly downloadTemplateService: DownloadTemplateService,
    @Inject(MAT_DIALOG_DATA) public data: DownloadTemplateModal[]
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  openTemplateFormat(i: any): void {
    this.downloadTemplateService.select(this.data[i]);
    this.downloadTemplateService.openTemplate(mockData.templateFormat);
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
