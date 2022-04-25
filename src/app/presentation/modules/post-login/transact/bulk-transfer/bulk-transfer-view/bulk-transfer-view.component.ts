import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BulkTransfersService } from 'src/app/core/services/transfers/bulk-transfers/bulk-transfers.service';
import { ActivatedRoute, Router } from "@angular/router";
import { PdfViewerService } from "src/app/core/services/pdf-viewer/pdf-viewer.service";

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

  constructor(
    private readonly fb: FormBuilder,
    private readonly bulkTransfersService: BulkTransfersService,
    private readonly route: ActivatedRoute,
    private readonly pdfViewerService: PdfViewerService,
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
          amount : item.amount,
          currency : item.currency,
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
    this.populateForm();
  }

  initForm(): void {
    this.bulkTransferViewForm = this.fb.group({
      paymentDate: ['', [Validators.required]],
      paymentType: ['', [Validators.required]],
      debitAccountName: ['', [Validators.required]],
      debitAccountNumber: ['',[Validators.required, Validators.pattern("[a-zA-Z0-9 ]{13}")]],
      beneficiaryAccountNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{12}")]],
      beneficiaryMobile: ['', [Validators.required, Validators.pattern("[0-9 ]{14}")]],
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

  // edit(id: any) {
  //   this.editMode = true;
  //   let index = this.viewPaymentDetails.indexOf(id);
  //   id.beneficiaryMobile = "Change Hardik";
  //   this.viewPaymentDetails[index] = id;
  // }
  edit(){
    this.editMode = true;
  }

  delete() {

  }

  save(id: any) {
    this.editMode = false;
    this.showAlert("The payment details have been updated");

    // const updatedData = {
    //   paymentDate: this.getForm.paymentDate.value,
    //   paymentType: this.getForm.paymentType.value,
    //   debitAccountName: this.getForm.debitAccountName.value,
    //   debitAccountNumber: this.getForm.debitAccountNumber.value,
    //   beneficiaryAccountNumber: this.getForm.beneficiaryAccountNumber.value,
    //   beneficiaryMobile: this.getForm.beneficiaryMobile.value,
    //   beneficiaryName: this.getForm.beneficiaryName.value,
    //   beneficiaryBank: this.getForm.beneficiaryBank.value,
    //   amount: this.getForm.amount.value,
    //   currency: this.getForm.currency.value,
    //   reference: this.getForm.reference.value,
    //   reason: this.getForm.reason.value,
    // };

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

    // console.log(updatedData);
    console.log(this.bulkTransferRecords)

  this.bulkTransfersService.bulkTransferPayload(this.bulkTransferRecords);

  }

  populateForm() {
    this.bulkTransferViewForm.controls.paymentDate.setValue(this.viewPaymentDetails[0]?.paymentDate);
    this.bulkTransferViewForm.controls.paymentType.setValue(this.viewPaymentDetails[0]?.paymentType);
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

  viewCsvData() {
    const payload = {
      documentName : this.viewData?.documentName,
      document : this.viewData?.document,
    }
    this.pdfViewerService.open(payload);
  }

}
