import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteService } from 'src/app/core/services/delete/delete.service';
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";
import { Router } from '@angular/router';

export interface User {
  date: string,
  type: string,
  name: string,
  bank: string,
  amount: string
}

@Component({
  selector: 'app-bulk-transfer-detail',
  templateUrl: './bulk-transfer-detail.component.html',
  styleUrls: ['./bulk-transfer-detail.component.scss']
})
export class BulkTransferDetailComponent implements OnInit {

  private users: User[];
  alertVisible: boolean;
  alertMessage: string;
  dataSource: MatTableDataSource<User>;
  type = 'bulk-transfer';

  displayedColumns: string[] = [
    'date',
    'type',
    'name',
    'bank',
    'amount',
    'actions',
  ];

  constructor(
    private readonly deleteService: DeleteService,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.users = Array(5).fill(0).map((x, i) => ({
        date: "4/3/22",
        type: "RTGS",
        name: "Mello",
        bank: "Equity",
        amount: "10,000.00"
      }));

    this.dataSource.data = this.users;
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
          value: `${this.type}`,
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
    console.log(user, 'user');
  }

}
