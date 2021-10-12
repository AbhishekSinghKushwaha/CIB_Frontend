import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-supporting-documents-upload',
  templateUrl: './supporting-documents-upload.component.html',
  styleUrls: ['./supporting-documents-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupportingDocumentsUploadComponent implements OnInit {

  fileName = '';

  constructor(
    readonly dialogRef: MatDialogRef<SupportingDocumentsUploadComponent>
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

  uploadFiles(event: any){
    const file:File = event.target.files[0];

    if(file){
      this.fileName = file.name;
    }

    console.log(this.fileName);

  }
  

}
