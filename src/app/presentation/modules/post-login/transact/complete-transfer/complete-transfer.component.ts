import { BillServiceService } from './../../../../../core/services/transfers/bill-service/bill-service.service';
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AddMerchantService } from "src/app/core/services/add-merchant/add-merchant.service";
import { BeneficiaryManagementService } from "src/app/core/services/beneficiary-management/beneficiary-management.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { InterbankService } from "src/app/core/services/transfers/interbank/interbank.service";
import { IntercountryService } from "src/app/core/services/transfers/intercountry/intercountry.service";
import { IntrabankService } from "src/app/core/services/transfers/intrabank/intrabank.service";
import { MobileMoneyService } from "src/app/core/services/transfers/mobile-money/mobile-money.service";
import { OwnAccountService } from "src/app/core/services/transfers/own-account/own-account.service";
import { SwiftTransferService } from "src/app/core/services/transfers/swift/swift-transfer.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-complete-transfer",
  templateUrl: "./complete-transfer.component.html",
  styleUrls: ["./complete-transfer.component.scss"],
})
export class CompleteTransferComponent implements OnInit {
  transferType: string;

  favouritesPayload: any;

  transferTypes = TransactionTypeConstants.TransferType;

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly addMerchantService: AddMerchantService,
    private ownEquityAccountTransferService: OwnAccountService,
    private intraBankService: IntrabankService,
    private interbankService: InterbankService,
    private swiftService: SwiftTransferService,
    private storageService: StorageService,
    private mobileMoneyService: MobileMoneyService,
    private beneficiaryManagementService: BeneficiaryManagementService,
    private interCountryService: IntercountryService,
    private billservice: BillServiceService
  ) {
    this.transferType = route.snapshot.params["type"];

  }

  ngOnInit(): void {
    this.getFavouritesPayload();
  }

  done() {
    switch (this.transferType) {
      case "approve-transaction":
        this.router.navigate(["/dashboard"]);
        break;
      case "reject-transaction":
        this.router.navigate(["/dashboard"]);
        break;
      default:
        this.router.navigate(["/transact"]);
        break;
    }
  }

  openAddFavourite() {
    this.addMerchantService.open(this.transferType);
  }

  clearAllSubjects() { }

  getFavouritesPayload() {
    console.log(this.transferType)
    console.log(this.transferTypes.BILL_PAYMENT)
    switch (this.transferType) {
      case this.transferTypes.OWN_EQUITY:
        this.ownEquityAccountTransferService.favouritesPayload$.subscribe(
          (res) => {
            this.favouritesPayload = res;
          }
        );
        break;
      case this.transferTypes.INTRA_BANK:
        this.intraBankService.favouritesPayload$.subscribe((res) => {
          this.favouritesPayload = res;
        });
        break;
      case this.transferTypes.EFT:
        this.interbankService.favouritesPayload$.subscribe((res) => {
          this.favouritesPayload = res;
        });
        break;
      case this.transferTypes.SWIFT:
        this.swiftService.favouritesPayload$.subscribe((res) => {
          this.favouritesPayload = res;
        });
        break;
      case this.transferTypes.RTGS:
        this.interbankService.favouritesPayload$.subscribe((res) => {
          this.favouritesPayload = res;
        });
        break;
      case this.transferTypes.MOBILE_MONEY:
        this.mobileMoneyService.favouritesPayload$.subscribe((res) => {
          this.favouritesPayload = res;
        });
        break;
      case this.transferTypes.SUBSIDIARY:
        this.interCountryService.favouritesPayload$.subscribe((res) => {
          this.favouritesPayload = res;
        });
        break;
      case this.transferTypes.BILL_PAYMENT:
        console.log("bill payment");
        this.billservice.favouritesPayload$.subscribe((res) => {

          this.favouritesPayload = res;
        })
        break;
      default:
        break;
    }
  }

  checkIfFavouriteExists(): boolean {
    // Get list of favourites
    const beneficiaries = this.storageService.getData("beneficiaries");
    const existingBeneficiaries = beneficiaries?.filter((v: any) => {
      return (
        v.accountNumber === this.favouritesPayload?.sendTo?.accountNumber ||
        (v.phoneNumber === this.favouritesPayload?.sendTo?.phoneNumber &&
          v.transferTypes === this.transferType)
      );
    });
    return existingBeneficiaries.length === 0;
  }

  addToFavourites() {

    const payload = {
      countryCode: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.countryCode : this.favouritesPayload?.sendTo?.country?.countryCode,
      bankCode: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.bankCode : this.favouritesPayload?.sendTo?.bank?.bankCode,
      branchCode: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.branchCode : this.favouritesPayload?.sendTo?.bank?.branchCode,
      fullName: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.fullName : this.favouritesPayload?.sendFrom?.accountName,
      firstName: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.firstName : this.favouritesPayload?.sendTo?.firstName,
      lastName: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.lastName : this.favouritesPayload?.sendTo?.lastName,
      accountNumber: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.accountNumber : this.setAccountNumber(this.transferType),
      fromAccount: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.accountNumber : this.favouritesPayload?.sendFrom?.accountNumber,
      phoneNumber: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.phoneNumber : this.favouritesPayload?.sendTo?.phoneNumber,
      ibanNumber: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.ibanNumber : this.favouritesPayload?.sendTo?.IBANNumber,
      streetAddress: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.streetAddress : this.favouritesPayload?.sendTo?.streetAddress,
      postalAddress: this.transferType === this.transferTypes.BILL_PAYMENT ? this.favouritesPayload.postalAddress : this.favouritesPayload?.sendTo?.streetAddress,
      transferTypes: this.transferType,
      isFavourite: true,
      productName: this.setProductName(this.transferType),
    };
    console.log(payload);
    this.beneficiaryManagementService.submitForm(payload);
  }

  setAccountNumber(transferType: string): string {
    let accountNumber = "";

    transferType === this.transferTypes.MOBILE_MONEY ||
      transferType === this.transferTypes.BUY_AIRTIME
      ? (accountNumber = this.favouritesPayload?.sendTo?.phoneNumber)
      : (accountNumber = this.favouritesPayload?.sendTo?.accountNumber);

    return accountNumber;
  }

  setProductName(transferType: string): string {
    let productName = "";

    transferType === this.transferTypes.SWIFT ||
      transferType === this.transferTypes.EFT ||
      transferType === this.transferTypes.SUBSIDIARY ||
      transferType === this.transferTypes.RTGS
      ? (productName = this.favouritesPayload.sendTo?.bank?.bankCode)
      : transferType === this.transferTypes.BUY_AIRTIME
        ? (productName = this.favouritesPayload?.telco?.telco)
        : transferType === this.transferTypes.MOBILE_MONEY
          ? (productName = this.favouritesPayload?.sendTo?.mobileWallet?.wallet)
          : transferType === this.transferTypes.INTRA_BANK
            ? (productName = "Equity")
            : transferType === this.transferTypes.BUY_GOODS
              ? (productName = "BuyGoods")
              : transferType === this.transferTypes.INTRA_BANK
                ? (productName = "Equity")
                : "";

    // TODO:: Do product selction for bill payments

    return productName;
  }
}
