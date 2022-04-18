import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadConfirmationService } from 'src/app/core/services/upload-confirmation/upload-confirmation.service';
import { StorageService } from "src/app/core/services/storage/storage.service";
import { Router } from "@angular/router";
import { BulkTransfersService } from "src/app/core/services/transfers/bulk-transfers/bulk-transfers.service";
import { PdfViewerService } from "src/app/core/services/pdf-viewer/pdf-viewer.service";

@Component({
  selector: 'app-supporting-documents-upload',
  templateUrl: './supporting-documents-upload.component.html',
  styleUrls: ['./supporting-documents-upload.component.scss'],
})
export class SupportingDocumentsUploadComponent implements OnInit {
  pdfSrc: string;
  currentFile?: File;
  fileName = '';
  files: any = [];
  progress = 50;
  message = '';
  progressFiles: any[] = [];
  test: any;

  constructor(
    private router: Router,
    private bulkTransfersService: BulkTransfersService,
    private storageService: StorageService,
    readonly dialogRef: MatDialogRef<SupportingDocumentsUploadComponent>,
    private readonly uploadConfirmationService: UploadConfirmationService,
    private readonly pdfViewerService: PdfViewerService
  ) { }

  ngOnInit(): void {
    console.log(this.storageService.getData("corporateId"));
  }

  close(): void {
    this.dialogRef.close(true);
  }

  uploadFiles(event: any){
    const file: File = event.dataTransfer
      ? event.dataTransfer.files[0]
      : event.target.files[0];

    if (file) {
      this.currentFile = file;
      this.fileName = this.currentFile.name;
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
    console.log(file);
  }

  _handleReaderLoaded(e: any) {
    var reader = e.target;
    const base64Image = reader.result;

    this.progressFiles.push({
      documentName: this.fileName,
      image: base64Image,
      progress: 0,
    });


    const uploadInterval = setInterval(() => {
      this.progressFiles[0].progress += 50;

      if (this.progressFiles[0].progress === 100) {
        this.files.push({
          documentName: this.fileName,
          image: base64Image,
          size: this.currentFile?.size,
        });
        console.log(this.files)
        this.progressFiles.pop();
        this.message = "Completed";
        clearInterval(uploadInterval);
      }
    }, 2000);
  }

  upload() {
    const modal = this.uploadConfirmationService.open();

    modal.afterClosed().subscribe(() => {
      this.bulkTransfersService.uploadCorporateDocuments(
        { documents: this.files },
        this.storageService.getData("corporateId")
      )
      .subscribe((res) => {
        if (res.isSuccessful) {
          console.log("Documents Uploaded Successfully");
        }
      });
    }); 
  }

  viewPdf(i: any) {
    this.pdfViewerService.open(this.files[i].documentName);
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
