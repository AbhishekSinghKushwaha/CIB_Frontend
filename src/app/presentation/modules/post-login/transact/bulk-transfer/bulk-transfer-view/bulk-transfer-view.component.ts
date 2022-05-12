import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BulkTransfersService } from 'src/app/core/services/transfers/bulk-transfers/bulk-transfers.service';
import { ActivatedRoute, Router } from "@angular/router";
import { PdfViewerService } from "src/app/core/services/pdf-viewer/pdf-viewer.service";
import { DeleteService } from 'src/app/core/services/delete/delete.service';
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: 'app-bulk-transfer-view',
  templateUrl: './bulk-transfer-view.component.html',
  styleUrls: ['./bulk-transfer-view.component.scss']
})
export class BulkTransferViewComponent implements OnInit {

  bulkTransferViewForm: FormGroup;
  editMode: boolean = false;
  alertVisible: boolean;
  alertMessage: string;
  id: number;
  viewPaymentDetails: any;
  error: boolean = false;
  viewData: any;
  
  bulkTransferRecords: any[] = [];

  transactionIcon = { Active: 'transaction_approved', Inactive: 'transaction_rejected' };
  transferType = TransactionTypeConstants.TransferType;
  paymentTypeConversion: any;


  constructor(
    private readonly fb: FormBuilder,
    private readonly bulkTransfersService: BulkTransfersService,
    private readonly route: ActivatedRoute,
    private readonly pdfViewerService: PdfViewerService,
    private readonly deleteService: DeleteService,
    private readonly router: Router
  ) { 
    this.id = route.snapshot.params["id"];
    console.log(this.id);
  }

  get getForm() {
    return this.bulkTransferViewForm.controls;
  }

  ngOnInit(): void {
    this.getCsvData();
    this.viewData = this.pdfViewerService.default;
    console.log(this.viewData, "viewData");
  }

  getCsvData() {
    this.bulkTransfersService.currentData.subscribe((data: any[]) => {
      data.map((item) => {
        const csvRecord = {
          id : Number(item.id),
          paymentDate : item.paymentDate,
          paymentType : item.paymentType,
          debitAccountName : item.debitAccountName,
          debitAccountNumber : item.debitAccountNumber,
          beneficiaryAccountNumber : item.beneficiaryAccountNumber,
          beneficiaryMobile : item.beneficiaryMobile,
          beneficiaryName : item.beneficiaryName,
          beneficiaryBank : item.beneficiaryBank,
          beneficiaryBankCode: item.beneficiaryBankCode,
          beneficiaryAddress: item.beneficiaryAddress,
          amount : item.amount,
          currency : item.currency,
          narration: item.narration,
          codeSwift: item.codeSwift,
          telco: item.telco,
          internationalAirtime: item.internationalAirtime,
          countryCode: item.countryCode,
          billerCode: item.billerCode,
          reference : item.reference,
          reason : item.reason,
        }
        this.bulkTransferRecords.push(csvRecord);
      });
      this.initForm();
      this.filterById();
    });
  }

  filterById(){
    this.viewPaymentDetails = this.bulkTransferRecords.filter(res => res.id == this.id);
    this.formatPaymentType(this.viewPaymentDetails[0]?.paymentType)
    this.populateForm();
  }

  initForm(): void {
    this.bulkTransferViewForm = this.fb.group({
      paymentDate: ['', [Validators.required]],
      paymentType: ['', [Validators.required]],
      debitAccountName: ['', [Validators.required]],
      debitAccountNumber: ['',[Validators.required, Validators.pattern("[a-zA-Z0-9 ]{13}")]],
      beneficiaryAccountNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{12}")]],
      beneficiaryMobile: ['', [Validators.required]],
      beneficiaryName: ['', [Validators.required]],
      beneficiaryBank: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      reference: ['', [Validators.required]],
      reason: [''],
    });
  }

  showAlert(message: string): void {
    if (this.alertVisible) {
      return;
    }
    this.alertVisible = true;
    this.alertMessage = message;
    setTimeout(() => (this.alertVisible = false), 2500);
  }

  edit(){
    this.editMode = true;
  }

  delete() {
    const payload = {
      title: 'Deleting a beneficiary',
      message: 'Once you remove a beneficiary, they will no longer be included in the bulk payment. Do you want to continue?',
      buttonNo: "No",
      buttonYes: "Yes"
    }
    const modal = this.deleteService.open(payload);
    modal.afterClosed().subscribe(() => {
      this.RemoveElementFromObjectArray(this.id)
      this.showAlert("The beneficiary has been removed");
      this.router.navigate(["/transact/bulk-transfer/details"]);   
    });
  }

  RemoveElementFromObjectArray(i: number) {
    this.bulkTransferRecords.forEach((value,index)=>{
        if(value.id==i) {
          this.bulkTransferRecords.splice(index,1);
        }
    });
    this.initForm();
    this.bulkTransfersService.bulkTransferPayload(this.bulkTransferRecords);
  } 

  save(id: any) {
    this.editMode = false;
    this.showAlert("The payment details have been updated");

    let index = this.bulkTransferRecords.indexOf(id);
    id.paymentDate = this.getForm.paymentDate.value,
    id.paymentType =  this.getForm.paymentType.value,
    id.debitAccountName =  this.getForm.debitAccountName.value,
    id.debitAccountNumber = this.getForm.debitAccountNumber.value,
    id.beneficiaryAccountNumber =  this.getForm.beneficiaryAccountNumber.value,
    id.beneficiaryMobile = this.getForm.beneficiaryMobile.value,
    id.beneficiaryName = this.getForm.beneficiaryName.value,
    id.beneficiaryBank = this.getForm.beneficiaryBank.value,
    id.amount = this.getForm.amount.value,
    id.currency = this.getForm.currency.value,
    id.reference = this.getForm.reference.value,
    id.reason = this.getForm.reason.value,

    this.bulkTransferRecords[index] = id;

    console.log(this.bulkTransferRecords)

  this.bulkTransfersService.bulkTransferPayload(this.bulkTransferRecords);

  }

  populateForm() {
    this.bulkTransferViewForm.controls.paymentDate.setValue(this.viewPaymentDetails[0]?.paymentDate);
    this.bulkTransferViewForm.controls.paymentType.setValue(this.paymentTypeConversion);
    this.bulkTransferViewForm.controls.debitAccountName.setValue(this.viewPaymentDetails[0]?.debitAccountName);
    this.bulkTransferViewForm.controls.debitAccountNumber.setValue(this.viewPaymentDetails[0]?.debitAccountNumber);
    this.bulkTransferViewForm.controls.beneficiaryAccountNumber.setValue(this.viewPaymentDetails[0]?.beneficiaryAccountNumber);
    this.bulkTransferViewForm.controls.beneficiaryMobile.setValue(this.viewPaymentDetails[0]?.beneficiaryMobile);
    this.bulkTransferViewForm.controls.beneficiaryName.setValue(this.viewPaymentDetails[0]?.beneficiaryName);
    this.bulkTransferViewForm.controls.beneficiaryBank.setValue(this.viewPaymentDetails[0]?.beneficiaryBank);
    this.bulkTransferViewForm.controls.amount.setValue(this.viewPaymentDetails[0]?.amount);
    this.bulkTransferViewForm.controls.currency.setValue(this.viewPaymentDetails[0]?.currency);
    this.bulkTransferViewForm.controls.reference.setValue(this.viewPaymentDetails[0]?.reference);
    this.bulkTransferViewForm.controls.reason.setValue(this.viewPaymentDetails[0]?.reason);
    
    if(this.bulkTransferViewForm.invalid){
      this.error = true;
    }
  }

  formatPaymentType(paymentType: any) {
    switch (paymentType) {
      case this.transferType.INTER_BANK:
        this.paymentTypeConversion = "Inter Bank";
        break;
      case this.transferType.INTRA_BANK:
        this.paymentTypeConversion = "Intra Bank";
        break;
      case this.transferType.SWIFT:
        this.paymentTypeConversion = "SWIFT";
        break;
      case this.transferType.BUY_AIRTIME:
        this.paymentTypeConversion = "Airtime";
        break;
      default:
        this.paymentTypeConversion = "Bill Payment";
        break;
    }
  }

  viewCsvData(i: any) {
    const payload = {
      documentName : this.viewData?.documentName[i].documentName,
      document : this.viewData?.document[i],
    }
    this.pdfViewerService.open(payload);
  }

  deleteFile(i:any) {
    this.viewData?.documentName.splice(i, 1);
  }

}
