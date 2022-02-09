import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(
    readonly dialogRef: MatDialogRef<SupportingDocumentsUploadComponent>
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
        this.files.push(this.fileName);
        // this.progress = 70;

        
        if(this.progress === 100){
          this.message = 'Completed'
        }
      }
    }
    
  }

  cancelUpload(i:any) {
    this.reset(i);
  }

  reset(num:any) {
    this.files.splice(num, 1);
  }
  

}
