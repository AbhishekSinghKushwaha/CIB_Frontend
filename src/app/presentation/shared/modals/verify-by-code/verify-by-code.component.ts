import {
  Component,
  OnInit,
  Input,
  Inject,
  ViewChildren,
  ElementRef,
  Output,
  QueryList,
} from "@angular/core";
import { otpCodeModel } from "src/app/core/domain/otp-code.model";
import { OtpCodeService } from "src/app/core/services/otp-code/otp-code.service";
import {
  FormControl,
  FormGroup,
  FormArray,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { BuyGoodsService } from "src/app/core/services/transfers/buy-goods/buy-goods.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import SharedUtils from "./../../../../core/utils/shared.util";
import { NotificationModalService } from "src/app/core/services/modal-services/notification-modal/notification-modal.service";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { BuyAirtimeService } from "src/app/core/services/transfers/buy-airtime/buy-airtime.service";
import { MobileMoneyService } from "src/app/core/services/transfers/mobile-money/mobile-money.service";
import { IntrabankService } from "src/app/core/services/transfers/intrabank/intrabank.service";
import { InterbankService } from "src/app/core/services/transfers/interbank/interbank.service";
import { SwiftTransferService } from "src/app/core/services/transfers/swift/swift-transfer.service";
import { IntercountryService } from "src/app/core/services/transfers/intercountry/intercountry.service";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";
import { OwnAccountService } from "src/app/core/services/transfers/own-account/own-account.service";
import { BillServiceService } from "src/app/core/services/transfers/bill-service/bill-service.service";
import { PesalinkService } from "src/app/core/services/transfers/pesalink/pesalink.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-verify-by-code",
  templateUrl: "./verify-by-code.component.html",
  styleUrls: ["./verify-by-code.component.scss"],
})
export class VerifyByCodeComponent implements OnInit {
  @ViewChildren("inputs") inputs: QueryList<any>;
  verifyOtpForm: FormGroup;
  timeToResend: number;
  otpResent = false;
  submitted = false;
  numOfDigits = 6;
  formSubmission = new Subject<boolean>();
  @Output() onOTPVerified = new Subject<string>();
  _otpError: boolean;
  @Input() set otpError(data: boolean) {
    if (data) {
      this.modalIncorectVerification();
    }
  }

  timeLeft: number = 60;
  interval: any;
  alertVisible: boolean;
  alertMessage: string;
  @Input() data: any;
  payload: any;
  airtimePayload: any;
  billPaymentPayload: any;

  formInput = ["input1", "input2", "input3", "input4", "input5", "input6"];
  @ViewChildren("formRow") rows: any;

  @Input() transactionType!: string;
  transferType = TransactionTypeConstants.TransferType;
  transactionApprovalStatus =
    TransactionTypeConstants.TransactionApprovalStatus;

  constructor(
    private readonly otpCodeService: OtpCodeService,
    private readonly buyGoodsService: BuyGoodsService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly notificationModalService: NotificationModalService,
    private readonly authService: AuthService,
    private readonly buyAirtimeService: BuyAirtimeService,
    private mobileMoneyService: MobileMoneyService,
    private intrabankService: IntrabankService,
    private interbankService: InterbankService,
    private swiftTransferService: SwiftTransferService,
    private intercountryService: IntercountryService,
    private transactionService: TransactionsService,
    private billPaymentService: BillServiceService,
    private ownEquityService: OwnAccountService,
    private pesalinkService: PesalinkService
  ) {
    this.initOtpForm();
  }

  ngOnInit(): void {
    this.initForm();
    this.initOTPTimer();
  }
  get f(): any {
    return this.verifyOtpForm.controls;
  }

  get otpMessage() {
    return this.authService.getOTPMessage();
  }

  get verifyOtpFormArray() {
    return this.verifyOtpForm.get("digits") as FormArray;
  }

  initOtpForm(): void {
    this.verifyOtpForm = this.fb.group({
      digits: this.fb.array([]),
    });
  }

  initOTPTimer(seconds: number = 60): void {
    this.timeToResend = seconds;
    const intervalId = setInterval(() => {
      this.timeToResend = this.timeToResend - 1;
      if (this.timeToResend === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
  restartOTPTimer(): void {
    const intervalId = setInterval(() => {
      this.otpResent = false;
      this.initOTPTimer();
      clearInterval(intervalId);
    }, 5000);
  }

  modalIncorectVerification(): void {
    const message = SharedUtils.getNotificationModalParam({
      title: "Incorrect verification code",
      message:
        "The details you entered aren't familiar to us. Please try again or register to create your profile",
      buttonText: "Try again",
    });
    this.notificationModalService.open(message);
  }

  initForm(): void {
    for (let i = 0; i < this.numOfDigits; i++) {
      (this.verifyOtpForm.get("digits") as FormArray).push(
        this.fb.control(null, Validators.required)
      );
    }
  }

  submit(): void {
    this.otpCodeService.set(this.verifyOtpForm.value);
  }

  showAlert(message: string): void {
    if (this.alertVisible) {
      return;
    }
    this.alertVisible = true;
    this.alertMessage = message;
    setTimeout(() => (this.alertVisible = false), 2500);
  }

  public async resendOTPCode(): Promise<void> {
    this.verifyOtpFormArray.reset();
    this.showAlert("We’ve sent you another code");
    this.authService.resendOTP().subscribe(
      (data) => {
        this.otpResent = true;
        this.restartOTPTimer();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  verify() {
    if (this.verifyOtpFormArray.valid) {
      this.onOTPVerified.next(this.verifyOtpFormArray.getRawValue().join(""));
    }
    this.submitOtp(this.verifyOtpFormArray.getRawValue().join(""));
  }

  submitOtp(otp: string) {
    this.otpError = false;
    if (otp) {
      this.authService.submitOTP(otp).submitOTP.subscribe(
        (response) => {
          if (response) {
            this.perfomTransfer();
          } else {
            this.otpError = true;
          }
        },
        (error) => {
          this.otpError = true;
          console.log({ error });
        }
      );
    }
  }

  billPayment() {
    this.billPaymentService.currentData.subscribe((data: any) => {
      this.billPaymentPayload = data;
      this.billPaymentService.setfavouritesPayload(data);
    });
    if (this.billPaymentPayload) {
      this.billPaymentService
        .postValidateBill(this.billPaymentPayload)
        .subscribe((res) => {
          if (res.status) {
            this.billPaymentService.setTransactionPayload(res.data);
            this.router.navigate([
              `/transact/transfer-submitted/${this.transferType.BILL_PAYMENT}`,
            ]);
          } else {
            console.log(res.message);
          }
        });
    }
  }

  buyAirtime() {
    this.buyAirtimeService.currentData.subscribe((data) => {
      this.airtimePayload = data;
    });
    if (this.airtimePayload) {
      this.buyAirtimeService
        .buyAirtimeTransfer(this.airtimePayload)
        .subscribe((res) => {
          if (res.status) {
            this.router.navigate(["/transact/buy-airtime/success"]);
          } else {
            console.log(res.message);
          }
        });
    }
  }

  buyGoods() {
    this.buyGoodsService.currentData.subscribe((data) => {
      this.payload = data;
    });
    if (this.payload) {
      this.buyGoodsService.buyGoodsTransfer(this.payload).subscribe((res) => {
        if (res.status) {
          this.router.navigate(["/transact/buy-goods/submit-transfer"]);
        } else {
          console.log(res.message);
          // TODO:: Notify Error
        }
      });
    }
  }

  pesalink() {
    this.pesalinkService.currentData.subscribe((data) => {
      this.payload = data;
    });
    if (this.payload) {
      this.pesalinkService.sendViaPesalink(this.payload).subscribe((res) => {
        if (res.status) {
          this.router.navigate([`/transact/transfer-submitted/${this.transactionType}`]);
        } else {
          console.log(res.message);
          // TODO:: Notify Error
        }
      });
    }
  }

  standingOrders() {
    this.router.navigate([
      `/transact/standing-orders/transfer-submitted/${this.transactionType}`,
    ]);
  }

  bulkTransfer() {
    this.router.navigate([
      `/transact/transfer-submitted/${this.transactionType}`,
    ]);
  }

  check(index: number, field: any, event: any): void {
    if (isNaN(parseInt(event.key, 10)) && event.key !== "Backspace") {
      event.preventDefault();
    }
    if (field.value && event.key !== "Backspace") {
      if (index < this.inputs.toArray().length - 1) {
        this.inputs.toArray()[index + 1].nativeElement.focus();
      }
    } else if (event.key === "Backspace") {
      if (index > 0) {
        field.setValue(null);
        this.inputs.toArray()[index - 1].nativeElement.focus();
      } else {
        // console.log('first field');
      }
    }
  }

  tryOtherMethod() {
    this.router.navigate([
      `/transact/otp-verification/${this.transactionType}`,
    ]);
  }

  perfomTransfer() {
    switch (this.transactionType) {
      case this.transferType.BUY_AIRTIME:
        this.buyAirtime();
        break;
      case this.transferType.BILL_PAYMENT:
        this.billPayment();
        break;
      case this.transferType.BUY_GOODS:
        this.buyGoods();
        break;
      case this.transferType.MOBILE_MONEY:
        this.mobileMoneyService.sendMobileMoney(this.transactionType);
        break;
      case this.transferType.INTRA_BANK:
        this.intrabankService.sendViaIntrabankTransfer(this.transactionType);
        break;
      case this.transferType.RTGS:
        this.interbankService.sendViaInterbankTransfer(this.transactionType);
        break;
      case this.transferType.EFT:
        this.interbankService.sendViaInterbankTransfer(this.transactionType);
        break;
      case this.transferType.SWIFT:
        this.swiftTransferService.sendViaSwiftTransfer(this.transactionType);
        break;
      case "approve-transaction":
        this.transactionService.approveTransaction("approve-transaction");
        break;
      case "reject-transaction":
        this.transactionService.approveTransaction("reject-transaction");
        break;
      case "reinitiate-transaction":
        this.transactionService.reinitiateTransaction("reinitiate-transaction");
        break;
      case this.transferType.SUBSIDIARY:
        this.intercountryService.sendToSubsidiary(this.transactionType);
        break;
      case this.transferType.OWN_EQUITY:
        this.ownEquityService.sendToOwnEquityAccount(this.transactionType);
        break;
      case "bulk-transfer":
        this.bulkTransfer();
        break;
      case "Standing Orders":
        this.standingOrders();
        break;
      case this.transferType.PESALINK:
        this.pesalink();
        break;
      default:
        break;
    }
  }
}
