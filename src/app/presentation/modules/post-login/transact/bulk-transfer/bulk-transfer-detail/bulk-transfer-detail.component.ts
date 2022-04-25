import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteService } from 'src/app/core/services/delete/delete.service';
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { BulkTransfersService } from 'src/app/core/services/transfers/bulk-transfers/bulk-transfers.service';

export interface User {
  id: number;
  paymentDate: string,
  paymentType: string,
  debitAccountName: string,
  debitAccountNumber: string,
  beneficiaryAccountNumber: string,
  beneficiaryMobile: string,
  beneficiaryName: string,
  beneficiaryBank: string,
  amount: string,
  currency: string,
  reference: string,
  reason: string,
}

@Component({
  selector: 'app-bulk-transfer-detail',
  templateUrl: './bulk-transfer-detail.component.html',
  styleUrls: ['./bulk-transfer-detail.component.scss']
})
export class BulkTransferDetailComponent implements OnInit {

  bulkTransferDetailForm: FormGroup;

  users: User[];
  alertVisible: boolean;
  alertMessage: string;
  dataSource: MatTableDataSource<User>;
  type = 'bulk-transfer';
  error: boolean = false;
  totalAmount: number = 0;
  beneficiaryNames: any = [];
  paymentDate: any = [];

  bulkTransferRecords: any[] = [];

  displayedColumns: string[] = [
    'date',
    'type',
    'name',
    'bank',
    'amount',
    'actions',
  ];

  userId: any;

  constructor(
    private readonly deleteService: DeleteService,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly bulkTransfersService: BulkTransfersService
  ) { }

  ngOnInit(): void {
    this.getCsvData();
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
    });
  }

  get bulkData() {
    return this.bulkTransferDetailForm.get("bulkData") as FormArray;
  }

  confirmationData() {
    this.bulkTransferRecords.map((res) => {
      this.totalAmount = this.totalAmount + Number(res.amount);
      this.beneficiaryNames.push(res.beneficiaryName);
      this.paymentDate.push(res.paymentDate);
    });
  }

  initForm(): void {
    this.bulkTransferDetailForm = this.fb.group({
      bulkData: this.fb.array([])
    });

    this.bulkTransferRecords.map((user) => {
      this.bulkData.push(this.fb.group({
        paymentDate: [user.paymentDate, [Validators.required]],
        paymentType: [user.paymentType, [Validators.required]],
        debitAccountName: [user.debitAccountName, [Validators.required]],
        debitAccountNumber: [user.debitAccountNumber,[Validators.required, Validators.pattern("[a-zA-Z0-9 ]{13}")]],
        beneficiaryAccountNumber: [user.beneficiaryAccountNumber, [Validators.required, Validators.pattern("[0-9 ]{12}")]],
        beneficiaryMobile: [user.beneficiaryMobile, [Validators.required, Validators.pattern("[0-9 ]{14}")]],
        beneficiaryName: [user.beneficiaryName, [Validators.required]],
        beneficiaryBank: [user.beneficiaryBank, [Validators.required]],
        amount: [user.amount, [Validators.required]],
        currency: [user.currency, [Validators.required]],
        reference: [user.reference, [Validators.required]],
        reason: [user.reason],
      }))
    });

    console.log(this.bulkTransferDetailForm.get("bulkData")?.value);

    if(this.bulkTransferDetailForm.get("bulkData")?.value.length > 0){
      this.totalAmount = 0
      this.beneficiaryNames = [];
      this.confirmationData();
    }

    if(this.bulkTransferDetailForm.invalid){
      this.error = true;
    }
  }

  showAlert(message: string): void {
    if (this.alertVisible) {
      return;
    }
    this.alertVisible = true;
    this.alertMessage = message;
    setTimeout(() => (this.alertVisible = false), 2500);
  }

  getTransferCharges(){
    this.confirmPayment("0");
  }

  confirmPayment(transferFee: string) {
    const data = {
      title: "Payment confirmation",
      subtitle: "To continue, please confirm your transaction",
      submitButtonText: "Confirm",
      content: [
        {
          key: "Transaction",
          value: "Bulk Transfer",
        },
        {
          key: "Total amount",
          value: `${this.totalAmount}`,
        },
        {
          key: "Charges",
          value: `${transferFee} <span>KES</span>`,
        },
        {
          key: "Number of payments ",
          value: `${this.bulkTransferRecords.length}`,
        },
        {
          key: "Frequency",
          value: "Monthly",
        },
        {
          key: "Payment date",
          value: `${this.paymentDate[0]}`,
        },
        {
          key: "Pay to",
          value: `${this.beneficiaryNames}`,
        },
      ],
    };

    this.confirmationModalService
      .open(data)
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (data) {
          this.submit();
        }
      });
  }

  submit() {
    const payload = {
      transactions: this.bulkTransferDetailForm.get("bulkData")?.value,
    }
    console.log(payload, "payload");

    this.bulkTransfersService.bulkTransfer(payload).subscribe((res) => {
      if(res.status){
        this.showAlert("You successfully uploaded a document");
        this.router.navigate([`/transact/otp-verification/${this.type}`]);   
      }
    });
  }

  deleteBeneficiary() {
    const payload = {
      title: 'Deleting a beneficiary',
      message: 'Once you remove a beneficiary, they will no longer be included in the bulk payment. Do you want to continue?',
      buttonNo: "No",
      buttonYes: "Yes"
    }
    const modal = this.deleteService.open(payload);
    modal.afterClosed().subscribe(() => {
      this.RemoveElementFromObjectArray(this.userId)
      this.showAlert("The beneficiary has been removed");
    });
  }

  RemoveElementFromObjectArray(i: number) {
    this.bulkTransferRecords.forEach((value,index)=>{
        if(value.id==i) {
          this.bulkTransferRecords.splice(index,1);
        }
    });
    this.initForm();
    // this.bulkTransfersService.deleteData(i);
  } 

  openActionsMenu(i:any): void {
    this.userId = i;
    console.log(this.userId, 'user');
  }

  viewDetails() {
    this.router.navigate([`/transact/bulk-transfer/view/${this.userId}`]);
  }

  cancel() {
    this.router.navigate(["/transact/bulk-transfer"]);
  }

}
