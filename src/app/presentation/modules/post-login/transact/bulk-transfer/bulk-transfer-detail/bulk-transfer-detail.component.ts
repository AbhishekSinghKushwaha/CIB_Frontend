import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteService } from 'src/app/core/services/delete/delete.service';
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  private users: User[];
  alertVisible: boolean;
  alertMessage: string;
  dataSource: MatTableDataSource<User>;
  type = 'bulk-transfer';
  error: boolean = false;

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
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.users = Array(5).fill(0).map((x, i) => ({
        id: 1,
        paymentDate: "4/3/22",
        paymentType: "RTGS",
        debitAccountName: "Loot",
        debitAccountNumber: "Equity",
        beneficiaryAccountNumber: "2337846578955",
        beneficiaryMobile: "0810174008113",
        beneficiaryName: "Mello",
        beneficiaryBank: "Equity",
        amount: "10.0000.00",
        currency: "KES",
        reference: "Ref_123",
        reason: "Cash management transfer",
      }));

    this.dataSource.data = this.users;
    this.initForm();
  }

  get getForm() {
    return this.bulkTransferDetailForm.controls;
  }

  initForm(): void {
    this.bulkTransferDetailForm = this.fb.group({
      paymentDate: ['', [Validators.required]],
      paymentType: ['', [Validators.required]],
      debitAccountName: ['', [Validators.required]],
      debitAccountNumber: ['',[Validators.required, Validators.pattern("[0-9 ]{13}")]],
      beneficiaryAccountNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{13}")]],
      beneficiaryMobile: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
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
          value: "10,000.00",
        },
        {
          key: "Charges",
          value: `${transferFee} <span>KES</span>`,
        },
        {
          key: "Number of payments ",
          value: "5",
        },
        {
          key: "Frequency",
          value: "Monthly",
        },
        {
          key: "Payment date",
          value: "01 January 2021",
        },
        {
          key: "Pay to",
          value: "Mello, Uche, Jacques, John, Victoria",
        },
      ],
    };

    this.confirmationModalService
      .open(data)
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (data) {
          this.router.navigate([`/transact/otp-verification/${this.type}`]);
        }
      });
  }

  submit() {
    this.showAlert("You successfully uploaded a document");
    this.confirmPayment("0.00");
  }

  deleteBeneficiary() {
    const payload = {
      title: 'Deleting a beneficiary',
      message: 'Once you remove a beneficiary, they will no longer be included in the bulk payment. Do you want to continue?',
      buttonNo: "No",
      buttonYes: "Yes"
    }
    const modal = this.deleteService.open(payload);
    modal.afterClosed().subscribe(() => {this.showAlert("The beneficiary has been removed");});
  }

  openActionsMenu(user: User): void {
    this.userId = user.id;
    console.log(user, 'user');
  }

  viewDetails() {
    this.router.navigate([`/transact/bulk-transfer/view/${this.userId}`]);
  }

}
