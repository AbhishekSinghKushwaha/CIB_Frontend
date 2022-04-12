import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadConfirmationService } from 'src/app/core/services/upload-confirmation/upload-confirmation.service';

@Component({
  selector: 'app-supporting-documents-upload',
  templateUrl: './supporting-documents-upload.component.html',
  styleUrls: ['./supporting-documents-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupportingDocumentsUploadComponent implements OnInit {

  currentFile?: File;
  fileName = '';
  files: any = [];
  progress = 0;
  message = '';
  progressFiles: any[] = [];


  constructor(
    readonly dialogRef: MatDialogRef<SupportingDocumentsUploadComponent>,
    private readonly uploadConfirmationService: UploadConfirmationService
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

  uploadFiles(event: any){
    if (event.target.files && event.target.files[0]) {
      const file:File = event.target.files[0];

      if(file){
        this.currentFile = file;
        this.fileName = this.currentFile.name;
        this.progressFiles.push(this.fileName);
        this.progress = 100;
        
        if(this.progress === 100){
          this.files.push(this.fileName);
          this.progressFiles.pop();
          this.message = 'Completed'
        }
      }
    }
  }

  upload() {
    this.uploadConfirmationService.open();
  }

  cancelUpload(i:any) {
    this.reset(i);
  }

  reset(num:any) {
    this.files.splice(num, 1);
  }
  
  delete(i:any) {
    this.files.splice(i, 1);
  }

}
