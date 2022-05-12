import { Component, Inject, OnInit, VERSION ,ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadConfirmationService } from 'src/app/core/services/upload-confirmation/upload-confirmation.service';
import { StorageService } from "src/app/core/services/storage/storage.service";
import { Router } from "@angular/router";
import { BulkTransfersService } from "src/app/core/services/transfers/bulk-transfers/bulk-transfers.service";
import { PdfViewerService } from "src/app/core/services/pdf-viewer/pdf-viewer.service";
import { DatePipe } from '@angular/common';

export class CsvData {
  public id: any;
  public paymentType: any;
  public debitAccountName: any;
  public debitAccountNumber: any;
  public beneficiaryAccountNumber: any;
  public beneficiaryMobile: any;
  public beneficiaryName: any;
  public beneficiaryBank: any;
  public beneficiaryBankCode: any;
  public beneficiaryAddress: any;
  public amount: any;
  public currency: any;
  public narration: any;
  public codeSwift: any;
  public telco: any;
  public internationalAirtime: any;
  public countryCode: any;
  public billerCode: any;
  public reference: any;
  public reason: any;
}

@Component({
  selector: 'app-supporting-documents-upload',
  templateUrl: './supporting-documents-upload.component.html',
  styleUrls: ['./supporting-documents-upload.component.scss'],
  providers: [DatePipe]
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
  data: any[];
  csvRecordsArray: any;
  headersRow: any;
  csvData: any[];
  bulkTransferRecords: any[] = [];

  myDate = new Date();
  paymentDate: any;

  constructor(
    private router: Router,
    private bulkTransfersService: BulkTransfersService,
    private storageService: StorageService,
    readonly dialogRef: MatDialogRef<SupportingDocumentsUploadComponent>,
    private readonly uploadConfirmationService: UploadConfirmationService,
    private readonly pdfViewerService: PdfViewerService,
    public datePipe: DatePipe
  ) { 
    this.paymentDate = this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
  }

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

  readFileAsText(file: any){
    let data: any[] = [];
        let reader = new FileReader();

        reader.onload = () => {
                let csvData = reader.result;
        
                let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        
                let headersRow = this.getHeaderArray(csvRecordsArray);
        
                data = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
                this.records.push(data);
                console.log(this.records);
              };

              reader.onerror = function () {
                console.log('error is occured while reading file!');
              };
              reader.readAsText(file);
  }

  uploadListener($event: any): void {
      let readers = [];
      let files = $event.srcElement.files;
      let input = $event.target;
      console.log(files);
  
      if (files) {
          this.currentFile = files;
          // this.fileName = this.currentFile[0].name;
        }
  
      // Store promises in array
      for(let i = 0;i < input.files.length;i++){
        if (this.isValidCSVFile(files[i])) {
          readers.push(this.readFileAsText(input.files[i]));
          this.handleReaderLoaded(input.files[i].name, input.files[i].size);
        }
        else {
          alert("Please import valid .csv file.");
          this.fileReset();
        }
    }
    
    // Trigger Promises
    Promise.all(readers).then((values) => {
        this.data = values;
    });
    }
  // uploadListener($event: any): void {
  //   let text = [];
  //   let files = $event.srcElement.files;
  //   console.log(files);

  //   if (files) {
  //       this.currentFile = files;
  //       this.fileName = this.currentFile[0].name;
  //     }

  //   if (this.isValidCSVFile(files[0])) {

  //     let input = $event.target;
  //     let reader = new FileReader();
  //     reader.readAsText(input.files[0]);

  //     reader.onload = () => {
  //       let csvData = reader.result;

  //       let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

  //       let headersRow = this.getHeaderArray(csvRecordsArray);

  //       this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
  //     };

  //     reader.onerror = function () {
  //       console.log('error is occured while reading file!');
  //     };

  //   } else {
  //     alert("Please import valid .csv file.");
  //     this.fileReset();
  //   }
  //   this.handleReaderLoaded();
  // }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let currentRecord = (csvRecordsArray[i]).split(',');
      if (currentRecord.length == headerLength) {
        let csvRecord: CsvData = new CsvData();
        csvRecord.id = currentRecord[0].trim();
        csvRecord.paymentType = currentRecord[1].trim();
        csvRecord.debitAccountName = currentRecord[2].trim();
        csvRecord.debitAccountNumber = currentRecord[3].trim();
        csvRecord.beneficiaryAccountNumber = currentRecord[4].trim();
        csvRecord.beneficiaryMobile = currentRecord[5].trim();
        csvRecord.beneficiaryName = currentRecord[6].trim();
        csvRecord.beneficiaryBank = currentRecord[7].trim();
        csvRecord.beneficiaryBankCode = currentRecord[8].trim();
        csvRecord.beneficiaryAddress = currentRecord[9].trim();
        csvRecord.amount = currentRecord[10].trim();
        csvRecord.currency = currentRecord[11].trim();
        csvRecord.narration = currentRecord[12].trim();
        csvRecord.codeSwift = currentRecord[13].trim();
        csvRecord.telco = currentRecord[14].trim();
        csvRecord.internationalAirtime = currentRecord[15].trim();
        csvRecord.countryCode = currentRecord[16].trim();
        csvRecord.billerCode = currentRecord[17].trim();
        csvRecord.reference = currentRecord[18].trim();
        csvRecord.reason = currentRecord[19].trim();
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

  handleReaderLoaded(fileName: any, fileOfSize: any) {
    this.progressFiles.push({
      documentName: fileName,
      progress: 0,
    });

    const uploadInterval = setInterval(() => {
      this.progressFiles[0].progress += 50;

      const fileSize = fileOfSize;

      const sizeInMB = (fileSize? fileSize / (1024*1024) : 0).toFixed(2);

      if (this.progressFiles[0].progress === 100) {
        this.files.push({
          documentName: fileName,
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
    for(let i = 0; i < this.records.length; i++){
      for(let j = 0; j < this.records[i].length; j++){
        const csvRecord = {
              id : Number(this.records[i][j].id),
              paymentDate : this.paymentDate,
              paymentType : this.records[i][j].paymentType,
              debitAccountName : this.records[i][j].debitAccountName,
              debitAccountNumber : this.records[i][j].debitAccountNumber,
              beneficiaryAccountNumber : this.records[i][j].beneficiaryAccountNumber,
              beneficiaryMobile : this.records[i][j].beneficiaryMobile,
              beneficiaryName : this.records[i][j].beneficiaryName,
              beneficiaryBank : this.records[i][j].beneficiaryBank,
              beneficiaryBankCode: this.records[i][j].beneficiaryBankCode,
              beneficiaryAddress : this.records[i][j].beneficiaryAddress,
              amount : this.records[i][j].amount,
              currency : this.records[i][j].currency,
              narration: this.records[i][j].narration,
              codeSwift: this.records[i][j].codeSwift,
              telco: this.records[i][j].telco,
              internationalAirtime: this.records[i][j].internationalAirtime,
              countryCode: this.records[i][j].countryCode,
              billerCode: this.records[i][j].billerCode,
              reference : this.records[i][j].reference,
              reason : this.records[i][j].reason,
            }
            this.bulkTransferRecords.push(csvRecord);
      }
    }

    const modal = this.uploadConfirmationService.open();

    modal.afterClosed().subscribe(() => {
      console.log(this.bulkTransferRecords);
      this.bulkTransfersService.bulkTransferPayload(this.bulkTransferRecords);      
    }); 

    
    const viewPayload = {
      documentName : this.files,
      document : this.records
    }

    this.pdfViewerService.set(viewPayload);
  }

  viewPdf(i: any) {
    const payload = {
      documentName : this.files[i].documentName,
      document : this.records[i]
    }

    this.pdfViewerService.open(payload);
  }

  cancelUpload(i:any) {
    this.reset(i);
  }

  reset(num:any) {
    this.progressFiles.splice(num, 1);
  }
  
  delete(i:any) {
    this.files.splice(i, 1);
    this.records.splice(i, 1);
  }

}
