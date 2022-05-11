import { Component, OnInit, Inject } from '@angular/core';
import { DownloadTemplateService } from 'src/app/core/services/download-template/download-template.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DownloadTemplateModal } from 'src/app/core/domain/download-template.model';
import { Angular2Csv } from 'angular2-csv';
import * as XLSX from 'xlsx';  

@Component({
  selector: 'app-template-format',
  templateUrl: './template-format.component.html',
  styleUrls: ['./template-format.component.scss']
})
export class TemplateFormatComponent implements OnInit {

  template: any;
  alertVisible: boolean;
  alertMessage: string;
  template1: string = 'Template 1';
  template2: string = 'Template 2';
  template3: string = 'Template 3';

  excelHeaders:string[] = [
    "ID",
    "PAYMENT TYPE",
    "DEBIT ACCOUNT NAME",
    "DEBIT ACCOUNT NUMBER",
    "BENEFICIARY ACCOUNT NUMBER",
    "BENEFICIARY MOBILE",
    "BENEFICIARY NAME",
    "NAME OF BANK",
    "BANK CODE",
    "BENEFICIARY ADDRESS",
    "AMOUNT",
    "CURRENCY",
    "NARRATION",
    "CODE SWIFT",
    "TELCO",
    "INTERNATIONAL AIRTIME",
    "COUNTRY CODE",
    "BILLER CODE",
    "REFERENCE",
    "REASON"
  ];
  templateToExcel:string[][] = [this.excelHeaders,[]];

  csvHeaders = [
    {
      id: 'ID',
      paymentType: 'PAYMENT TYPE',
      debitAccountName: 'DEBIT ACCOUNT NAME',
      debitAccountNumber: 'DEBIT ACCOUNT NUMBER',
      beneficiaryAccountNumber: 'BENEFICIARY ACCOUNT NUMBER',
      beneficiaryMobile: 'BENEFICIARY MOBILE',
      beneficiaryName: 'BENEFICIARY NAME ',
      beneficiaryBank: 'NAME OF BANK',
      bankCode: 'BANK CODE',
      beneficiaryAddress: 'BENEFICIARY ADDRESS',
      amount: 'AMOUNT',
      currency: 'CURRENCY',
      narration: 'NARRATION',
      codeSwift: 'CODE SWIFT',
      telco: 'TELCO',
      internationalAirtime: 'INTERNATIONAL AIRTIME',
      countryCode: 'COUNTRY CODE',
      billerCode: 'BILLER CODE',
      reference: 'REFERENCE',
      reason: 'REASON',
    }
  ];

  options = {
    title: '',
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    useBom: true,
    headers: [],
  };


  constructor(
    private readonly dialogRef: MatDialogRef<TemplateFormatComponent>,
    private readonly downloadTemplateService: DownloadTemplateService,
    @Inject(MAT_DIALOG_DATA) public data: DownloadTemplateModal[],
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.template = this.downloadTemplateService.defaultData;
  }

  showAlert(message: string): void {
    if (this.alertVisible) {
      return;
    }
    this.alertVisible = true;
    this.alertMessage = message;
    setTimeout(() => (this.alertVisible = false), 2500);
  }

  downloadExcel() {
    const ws: XLSX.WorkSheet=XLSX.utils.aoa_to_sheet(this.templateToExcel);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);

    if(this.template.id == 1){
      XLSX.writeFile(wb,"Template 1"+".xlsx");
    }
    else if(this.template.id == 2){
      XLSX.writeFile(wb,"Template 2"+".xlsx");
    }
    else if(this.template.id == 3){
      XLSX.writeFile(wb,"Template 3"+".xlsx");
    }

    this.dialog.closeAll();
    this.showAlert("You successfully downloaded a template");
  }

  downloadCSV() {
    if(this.template.id == 1){
      new Angular2Csv(this.csvHeaders, this.template1);
    }
    else if(this.template.id == 2){
      new Angular2Csv(this.csvHeaders, this.template2);
    }
    else if(this.template.id == 3){
      new Angular2Csv(this.csvHeaders, this.template3);
    }

    this.dialog.closeAll();
    this.showAlert("You successfully downloaded a template");
  }

  downloadOther() {
    this.dialog.closeAll();
    this.showAlert("You successfully downloaded a template");
  }

  close(): void {
    this.dialogRef.close(true);
  }
}
