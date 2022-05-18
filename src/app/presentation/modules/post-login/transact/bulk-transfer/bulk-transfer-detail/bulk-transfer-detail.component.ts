import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { DeleteService } from "src/app/core/services/delete/delete.service";
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { BulkTransfersService } from "src/app/core/services/transfers/bulk-transfers/bulk-transfers.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { BuyAirtimeService } from "src/app/core/services/transfers/buy-airtime/buy-airtime.service";

export interface User {
  id: number;
  paymentDate: string;
  paymentType: string;
  debitAccountName: string;
  debitAccountNumber: string;
  beneficiaryAccountNumber: string;
  beneficiaryMobile: string;
  beneficiaryName: string;
  beneficiaryBank: string;
  amount: string;
  currency: string;
  reference: string;
  reason: string;
}

@Component({
  selector: "app-bulk-transfer-detail",
  templateUrl: "./bulk-transfer-detail.component.html",
  styleUrls: ["./bulk-transfer-detail.component.scss"],
})
export class BulkTransferDetailComponent implements OnInit {
  bulkTransferDetailForm: FormGroup;

  users: User[];
  alertVisible: boolean;
  alertMessage: string;
  dataSource: MatTableDataSource<User>;
  type = "bulk-transfer";
  error: boolean = false;
  totalAmount: number = 0;
  beneficiaryNames: any = [];
  paymentDate: any = [];
  checked: boolean;
  errorName: any = [];

  bulkTransferRecords: any[] = [];
  cancelTransferRecords: any[] = [];

  billspaymentRequests: any[] = [];
  airtimePaymentRequests: any[] = [];
  interBankTransferRequests: any[] = [];
  intraBankTransferRequests: any[] = [];
  swiftPaymentRequests: any[] = [];

  displayedColumns: string[] = [
    "date",
    "type",
    "name",
    "bank",
    "amount",
    "actions",
  ];

  userId: any;

  transferType = TransactionTypeConstants.TransferType;
  transactionType: any;
  transferFee: number = 0;
  paymentTypeConversion: any;

  constructor(
    private readonly deleteService: DeleteService,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly bulkTransfersService: BulkTransfersService,
    private buyAirtimeService: BuyAirtimeService
  ) {}

  ngOnInit(): void {
    this.getCsvData();
    this.salaryEnabled();
  }

  salaryEnabled() {
    this.bulkTransfersService.salaryMode.subscribe((data) => {
      this.checked = data;
    });
  }

  splitCsvData() {
    this.bulkTransferRecords.map((item) => {
      // if(item.paymentType == this.transferType.INTER_BANK) {
      //   const interBankRecord = {
      //     paymentDate : item.paymentDate,
      //     paymentType : item.paymentType,
      //     beneficiaryName : item.beneficiaryName,
      //     bank : item.beneficiaryBank,
      //     amount : item.amount,
      //     debitAccountNumber : item.debitAccountNumber,
      //     debitAccountName : item.debitAccountName,
      //     beneficiaryAccountNumber : item.beneficiaryAccountNumber,
      //     beneficiaryMobile : item.beneficiaryMobile,
      //     beneficiaryBankCode: item.beneficiaryBankCode,
      //     currency : item.currency,
      //     reference : item.reference,
      //     paymentReason : item.reason,
      //   }
      //   this.interBankTransferRequests.push(interBankRecord);
      // }
      // else
      if (item.paymentType == this.transferType.SWIFT) {
        const swiftRecord = {
          reference: item.reference,
          currency: item.currency,
          amount: item.amount,
          debitAccountNumber: item.debitAccountNumber,
          destinationAccount: item.beneficiaryAccountNumber,
          destinationName: item.beneficiaryName,
          destinationCountry: item.countryCode,
          swiftBicSortFedNumber: item.codeSwift,
          paymentReason: item.reason,
          isFedNumber: true,
          destinationBankCode: item.beneficiaryBankCode,
        };
        this.swiftPaymentRequests.push(swiftRecord);
      } else if (item.paymentType == this.transferType.INTRA_BANK) {
        const intraBankRecord = {
          reference: item.reference,
          currency: item.currency,
          amount: item.amount,
          debitAccountNumber: item.debitAccountNumber,
          destinationAccount: item.beneficiaryAccountNumber,
          paymentReason: item.reason,
          bank: item.beneficiaryBank,
        };
        this.intraBankTransferRequests.push(intraBankRecord);
      } else if (item.paymentType == this.transferType.BUY_AIRTIME) {
        const airtimeRecord = {
          reference: item.reference,
          currency: item.currency,
          amount: item.amount,
          phoneNumber: item.beneficiaryMobile,
          telco: item.telco,
          debitAccountNumber: item.debitAccountNumber,
          isInternationalAirtime: true,
          countryCode: item.countryCode,
        };
        this.airtimePaymentRequests.push(airtimeRecord);
      } else {
        const billPaymentRecord = {
          reference: item.reference,
          currency: item.currency,
          amount: item.amount,
          debitAccountNumber: item.debitAccountNumber,
          paymentReason: item.reason,
          scheduled: true,
          narration: item.narration,
          billAccountNumber: item.beneficiaryAccountNumber,
          billerCode: item.billerCode,
        };
        this.billspaymentRequests.push(billPaymentRecord);
      }
    });
  }

  getCsvData() {
    this.bulkTransfersService.currentData.subscribe((data: any[]) => {
      data.map((item) => {
        const csvRecord = {
          id: Number(item.id),
          paymentDate: item.paymentDate,
          paymentType: Number(item.paymentType),
          debitAccountName: item.debitAccountName,
          debitAccountNumber: item.debitAccountNumber,
          beneficiaryAccountNumber: item.beneficiaryAccountNumber,
          beneficiaryMobile: item.beneficiaryMobile,
          beneficiaryName: item.beneficiaryName,
          beneficiaryBank: item.beneficiaryBank,
          beneficiaryBankCode: item.beneficiaryBankCode,
          beneficiaryAddress: item.beneficiaryAddress,
          amount: item.amount,
          currency: item.currency,
          narration: item.narration,
          codeSwift: item.codeSwift,
          telco: item.telco,
          internationalAirtime: item.internationalAirtime,
          countryCode: item.countryCode,
          billerCode: item.billerCode,
          reference: item.reference,
          reason: item.reason,
        };
        this.bulkTransferRecords.push(csvRecord);
      });

      this.initForm();
      this.splitCsvData();
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
      bulkData: this.fb.array([]),
    });

    this.bulkTransferRecords.map((user, i) => {
      this.formatPaymentType(user.paymentType);
      this.bulkData.push(
        this.fb.group({
          id: [user.id],
          paymentDate: [user.paymentDate, [Validators.required]],
          paymentType: [this.paymentTypeConversion, [Validators.required]],
          debitAccountName: [user.debitAccountName, [Validators.required]],
          debitAccountNumber: [
            user.debitAccountNumber,
            [Validators.required, Validators.pattern("[a-zA-Z0-9 ]{13}")],
          ],
          beneficiaryAccountNumber: [
            user.beneficiaryAccountNumber,
            [Validators.required, Validators.pattern("[0-9 ]{12}")],
          ],
          beneficiaryMobile: [user.beneficiaryMobile, [Validators.required]],
          beneficiaryName: [user.beneficiaryName, [Validators.required]],
          beneficiaryBank: [user.beneficiaryBank, [Validators.required]],
          amount: [user.amount, [Validators.required]],
          currency: [user.currency, [Validators.required]],
          reference: [user.reference, [Validators.required]],
          reason: [user.reason],
        })
      );

      if (
        this.bulkData.controls[i]?.get("beneficiaryAccountNumber")?.errors
          ?.pattern ||
        this.bulkData.controls[i]?.get("debitAccountNumber")?.errors?.pattern ||
        this.bulkData.controls[i]?.get("beneficiaryMobile")?.errors?.pattern ||
        this.bulkData.controls[i]?.get("paymentType")?.hasError("required") ||
        this.bulkData.controls[i]
          ?.get("beneficiaryBank")
          ?.hasError("required") ||
        this.bulkData.controls[i]?.get("amount")?.hasError("required")
      ) {
        this.errorName.push(user.beneficiaryName);
      }
    });

    if (this.bulkTransferDetailForm.get("bulkData")?.value.length > 0) {
      this.totalAmount = 0;
      this.beneficiaryNames = [];
      this.confirmationData();
    }

    if (this.bulkTransferDetailForm.invalid) {
      this.error = true;
    }
  }

  formatPaymentType(paymentType: any) {
    switch (paymentType) {
      case 3001:
        this.paymentTypeConversion = "Inter Bank";
        break;
      case 2:
        this.paymentTypeConversion = "Intra Bank";
        break;
      case 5:
        this.paymentTypeConversion = "SWIFT";
        break;
      case 10:
        this.paymentTypeConversion = "Airtime";
        break;
      default:
        this.paymentTypeConversion = "Bill Payment";
        break;
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

  getTransferCharges() {
    this.bulkTransferRecords.map((res) => {
      const payload = {
        amount: res.amount,
        currency: res.currency,
        destinationAccount: res.beneficiaryAccountNumber,
        sourceAccount: res.debitAccountNumber,
        transferType: res.paymentType,
        destinationBankCode: res.beneficiaryBankCode,
        countryCode: res.countryCode,
        destinationCountryCode: res.countryCode,
      };

      const airtimePayload = {
        telco: res.telco,
        amount: res.amount,
        sourceAccount: res.debitAccountNumber,
      };

      if (res.paymentType == 10) {
        this.buyAirtimeService.getCharges(airtimePayload).subscribe((res) => {
          if (res.status) {
            this.transferFee += Number(res.data);
          }
        });
      } else if (
        res.paymentType !== 10 &&
        res.paymentType !== 0 &&
        !Number.isNaN(res.paymentType)
      ) {
        this.bulkTransfersService
          .getTransferCharges(payload)
          .subscribe((res) => {
            if (res.status) {
              this.transferFee += Number(res.data);
            } else {
              // TODO:: Notify error
            }
          });
      } else if (Number.isNaN(res.paymentType) || res.paymentType == 0) {
        console.log("No payment type");
      }
    });

    const uploadInterval = setInterval(() => {
      this.confirmPayment(this.transferFee);
      clearInterval(uploadInterval);
    }, 8000);
  }

  confirmPayment(transferFee: any) {
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
      externalBatchId: "string",
      isSalaryPayments: this.checked,
      airtimePaymentRequests: {
        isSalaryPayments: this.checked,
        transactions: this.airtimePaymentRequests,
      },
      billspaymentRequests: {
        isSalaryPayments: this.checked,
        transactions: this.billspaymentRequests,
      },
      interBankTransferRequests: {
        isSalaryPayments: this.checked,
        transactions: this.interBankTransferRequests,
      },
      intraBankTransferRequests: {
        isSalaryPayments: this.checked,
        transactions: this.intraBankTransferRequests,
      },
      swiftPaymentRequests: {
        isSalaryPayments: this.checked,
        transactions: this.swiftPaymentRequests,
      },
    };

    this.bulkTransfersService
      .bulkTransferMultipleMode(payload)
      .subscribe((res) => {
        if (res.status) {
          this.showAlert("You successfully uploaded a document");
          this.router.navigate([`/transact/otp-verification/${this.type}`]);
        }
      });

    // this.checked ?
    // this.bulkTransfersService.bulkTransferMultipleMode(payload).subscribe((res) => {
    //   if(res.status){
    //     this.showAlert("You successfully uploaded a document");
    //     this.router.navigate([`/transact/otp-verification/${this.type}`]);
    //   }
    // })
    // :
    // this.bulkTransfersService.bulkTransfer(payload).subscribe((res) => {
    //   if(res.status){
    //     this.showAlert("You successfully uploaded a document");
    //     this.router.navigate([`/transact/otp-verification/${this.type}`]);
    //   }
    // });
  }

  deleteBeneficiary() {
    const payload = {
      title: "Deleting a beneficiary",
      message:
        "Once you remove a beneficiary, they will no longer be included in the bulk payment. Do you want to continue?",
      buttonNo: "No",
      buttonYes: "Yes",
    };
    const modal = this.deleteService.open(payload);
    modal.afterClosed().subscribe(() => {
      this.RemoveElementFromObjectArray(this.userId);
      this.showAlert("The beneficiary has been removed");
    });
  }

  RemoveElementFromObjectArray(i: number) {
    this.bulkTransferRecords.forEach((value, index) => {
      if (value.id == i) {
        this.bulkTransferRecords.splice(index, 1);
      }
    });
    this.initForm();
  }

  openActionsMenu(i: any): void {
    this.userId = i;
  }

  viewDetails() {
    this.router.navigate([`/transact/bulk-transfer/view/${this.userId}`]);
  }

  cancel() {
    this.router.navigate(["/transact/bulk-transfer"]);
    this.bulkTransfersService.bulkTransferPayload(this.cancelTransferRecords);
  }
}
