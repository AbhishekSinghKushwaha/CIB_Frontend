import { Component, Inject, OnInit, VERSION ,ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadConfirmationService } from 'src/app/core/services/upload-confirmation/upload-confirmation.service';
import { StorageService } from "src/app/core/services/storage/storage.service";
import { Router } from "@angular/router";
import { BulkTransfersService } from "src/app/core/services/transfers/bulk-transfers/bulk-transfers.service";
import { PdfViewerService } from "src/app/core/services/pdf-viewer/pdf-viewer.service";

export class CsvData {
  public id: any;
  public paymentDate: any;
  public paymentType: any;
  public debitAccountName: any;
  public debitAccountNumber: any;
  public beneficiaryAccountNumber: any;
  public beneficiaryMobile: any;
  public beneficiaryName: any;
  public beneficiaryBank: any;
  public amount: any;
  public currency: any;
  public reference: any;
  public reason: any;
}

@Component({
  selector: 'app-supporting-documents-upload',
  templateUrl: './supporting-documents-upload.component.html',
  styleUrls: ['./supporting-documents-upload.component.scss'],
})
export class SupportingDocumentsUploadComponent implements OnInit {

  name = 'Angular ' + VERSION.major;
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  jsondatadisplay:any;

  pdfSrc: string;
  currentFile: any;
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

  // uploadFiles(event: any){
  //   const file: File = event.dataTransfer
  //     ? event.dataTransfer.files[0]
  //     : event.target.files[0];

  //   if (file) {
  //     this.currentFile = file;
  //     this.fileName = this.currentFile.name;
  //     var reader = new FileReader();

  //     reader.onload = this._handleReaderLoaded.bind(this);
  //     reader.readAsDataURL(file);
  //   }
  //   console.log(file);
  // }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  uploadListener($event: any): void {
    let text = [];
    let files = $event.srcElement.files;
    console.log(files);

    if (files) {
        this.currentFile = files;
        this.fileName = this.currentFile[0].name;
      }

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;

        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
    this.handleReaderLoaded();
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (csvRecordsArray[i]).split(',');
      if (currentRecord.length == headerLength) {
        let csvRecord: CsvData = new CsvData();
        csvRecord.id = currentRecord[0].trim();
        csvRecord.paymentDate = currentRecord[1].trim();
        csvRecord.paymentType = currentRecord[2].trim();
        csvRecord.debitAccountName = currentRecord[3].trim();
        csvRecord.debitAccountNumber = currentRecord[4].trim();
        csvRecord.beneficiaryAccountNumber = currentRecord[5].trim();
        csvRecord.beneficiaryMobile = currentRecord[6].trim();
        csvRecord.beneficiaryName = currentRecord[7].trim();
        csvRecord.beneficiaryBank = currentRecord[8].trim();
        csvRecord.amount = currentRecord[9].trim();
        csvRecord.currency = currentRecord[10].trim();
        csvRecord.reference = currentRecord[11].trim();
        csvRecord.reason = currentRecord[12].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
    this.jsondatadisplay = '';
  }

  handleReaderLoaded() {
    this.progressFiles.push({
      documentName: this.fileName,
      progress: 0,
    });

    const uploadInterval = setInterval(() => {
      this.progressFiles[0].progress += 50;

      const fileSize = this.currentFile[0]?.size;

      const sizeInMB = (fileSize? fileSize / (1024*1024) : 0).toFixed(2);

      if (this.progressFiles[0].progress === 100) {
        this.files.push({
          documentName: this.fileName,
          size: sizeInMB
        });
        console.log(this.files)
        this.progressFiles.pop();
        this.message = "Completed";
        clearInterval(uploadInterval);
      }
    }, 1000);
  }

  upload() {
    const modal = this.uploadConfirmationService.open();

    modal.afterClosed().subscribe(() => {
      this.bulkTransfersService.bulkTransferPayload(this.records);      
    }); 
  }

  viewPdf(i: any) {
    const payload = {
      documentName : this.files[i].documentName,
      document : this.records
    }
    this.pdfViewerService.set(payload);
    this.pdfViewerService.open(payload);
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
