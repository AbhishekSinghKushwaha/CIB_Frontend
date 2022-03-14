import { Component, OnInit, Input, Output } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BeneficiaryManagementService } from "src/app/core/services/beneficiary-management/beneficiary-management.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { PhoneNumberUtil } from "google-libphonenumber";
import { CountryModel } from "src/app/core/domain/bank.model";
import { MobileWalletsService } from "src/app/core/services/modal-services/mobile-wallets.service";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";
import { TransferFromService } from "src/app/core/services/modal-services/transfer-from.service";
import { TelcoService } from "src/app/core/services/modal-services/telco.service";
import { IntrabankService } from "src/app/core/services/transfers/intrabank/intrabank.service";
@Component({
  selector: "app-beneficiary-management-form",
  templateUrl: "./beneficiary-management-form.component.html",
  styleUrls: ["./beneficiary-management-form.component.scss"],
})
export class BeneficiaryManagementFormComponent implements OnInit {
  beneficiaryForm: FormGroup;
  editMode: boolean = false;
  transferType = TransactionTypeConstants.TransferType;
  beneficiaryId: any;
  phoneUtil: any;
  selectedCountry: CountryModel;
  get getFormFields() {
    return this.beneficiaryForm.controls;
  }

  initialPhoneNumber: string;
  constructor(
    private readonly beneficiaryManagementService: BeneficiaryManagementService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private mobileWalletService: MobileWalletsService,
    private sharedDataService: SharedDataService,
    private transferFromService: TransferFromService,
    private telcoService: TelcoService,
    private readonly intraBankService: IntrabankService
  ) {
    this.beneficiaryId = route.snapshot.paramMap.get("id");
    this.phoneUtil = PhoneNumberUtil.getInstance();
  }

  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }

  private initForm(): void {
    this.beneficiaryForm = this.fb.group({
      transferType: ["", [Validators.required]],
      country: [""],
      bank: [""],
      firstName: [""],
      lastName: [""],
      accountNumber: [""],
      phoneNumber: [""],
      IBANNumber: [""],
      streetAddress: [""],
      postalAddress: [""],
      accountName: [""],
      telco: [""],
      mobileWallet: [""],
      till: [""],
      favourite: [false],
      sendFrom: [""],
    });
  }

  populateForm() {
    if (this.beneficiaryId) {
      this.editMode = true;
      this.beneficiaryManagementService
        .getBeneficiary(this.beneficiaryId)
        .subscribe((res) => {
          if (res.status) {
            this.initialPhoneNumber = res.data?.phoneNumber;
            // Populate form
            this.beneficiaryForm.controls.transferType.setValue(
              this.setTransferType(
                this.transferType,
                res.data.transferTypes.toString()
              )
            );

            this.beneficiaryForm.controls.country.setValue(
              res.data?.country || ""
            );
            this.beneficiaryForm.controls.bank.setValue(res.data.bank || "");
            this.beneficiaryForm.controls.firstName.setValue(
              res.data.firstName
            );
            this.beneficiaryForm.controls.lastName.setValue(res.data.lastName);
            this.beneficiaryForm.controls.accountNumber.setValue(
              res.data.accountNumber
            );
            this.beneficiaryForm.controls.phoneNumber.setValue(
              this.formatPhoneNumber(res.data.phoneNumber)
            );
            this.beneficiaryForm.controls.postalAddress.setValue(
              res.data.postalAddress
            );
            this.beneficiaryForm.controls.streetAddress.setValue(
              res.data.streetAddress
            );
            this.beneficiaryForm.controls.accountName.setValue(
              res.data.fullName
            );
            this.telcoService.selectTelco(res.data?.telcoOperator || "");
            this.mobileWalletService.selectWallet(res.data?.mobileWallet || "");
            this.beneficiaryForm.controls.IBANNumber.setValue(
              res.data.ibanNumber
            );
            this.beneficiaryForm.controls.favourite.setValue(
              res.data.isFavourite
            );

            this.setFromAccount(res.data.fromAccount);
          }
        });
    } else {
      this.beneficiaryForm.controls.transferType.setValue({
        key: "EFT",
        value: "4",
      });
    }
  }

  formatPhoneNumber(number: any): string {
    const countries = this.storageService.getData("countries");
    const countryCode = this.phoneUtil.parse("+" + number, "").getCountryCode();

    const country = countries.filter((v: CountryModel) => {
      return v.dialCode === countryCode.toString();
    });

    // this.countryService.selectCountry(country[0]);
    this.selectedCountry = country[0];

    return number.replace(countryCode, "").trim();
  }

  setTransferType(object: any, value: string) {
    const key = Object.keys(object).find((key) => object[key] === value);
    return { key, value };
  }

  setFromAccount(fromAccount: string) {
    this.sharedDataService.userAccounts.subscribe((x) => {
      const account = x.find((el) => {
        return (el.accountNumber = Number(fromAccount));
      });
      this.beneficiaryForm.controls.sendFrom.setValue(account || "");
    });
  }

  async createBeneficiary() {
    console.log(await this.perfomNameEquiry());
    if (!this.beneficiaryForm.get("phoneNumber")?.dirty) {
      this.beneficiaryForm.controls.phoneNumber.setValue(
        this.initialPhoneNumber
      );
    }

    if (
      this.getFormFields.transferType.value.value ===
      this.transferType.INTRA_BANK
    ) {
      const response = await this.perfomNameEquiry();
      response.status
        ? this.getFormFields.accountName.setValue(response.data.accountName)
        : "";
    }

    const payload = {
      countryCode: this.getFormFields.country.value.countryCode,
      bankCode: this.getFormFields.bank.value.bankCode,
      branchCode: this.getFormFields.bank.value.branchCode,
      fullName: this.getFormFields.accountName.value,
      firstName: this.getFormFields.firstName.value,
      lastName: this.getFormFields.lastName.value,
      accountNumber: this.setAccountNumber(
        this.getFormFields.transferType.value.value
      ),
      fromAccount: this.getFormFields.sendFrom.value.accountNumber,
      phoneNumber: this.getFormFields.phoneNumber.value,
      ibanNumber: this.getFormFields.IBANNumber.value,
      streetAddress: this.getFormFields.streetAddress.value,
      postalAddress: this.getFormFields.postalAddress.value,
      transferTypes: this.getFormFields.transferType.value.value,
      isFavourite: this.getFormFields.favourite.value,
      productName: this.setProductName(
        this.getFormFields.transferType.value.value
      ),
    };

    this.editMode
      ? this.beneficiaryManagementService.updateForm(
          { ...payload, ...{ id: this.beneficiaryId } },
          this.beneficiaryId
        )
      : this.beneficiaryManagementService.submitForm(payload);
  }

  setAccountNumber(transferType: string): string {
    let accountNumber = "";

    transferType === this.transferType.MOBILE_MONEY ||
    transferType === this.transferType.BUY_AIRTIME
      ? (accountNumber = this.getFormFields.phoneNumber.value)
      : (accountNumber = this.getFormFields.accountNumber.value);

    return accountNumber;
  }

  setProductName(transferType: string): string {
    let productName = "";

    transferType === this.transferType.SWIFT ||
    transferType === this.transferType.EFT ||
    transferType === this.transferType.INTER_COUNTRY_TRANSFER ||
    transferType === this.transferType.RTGS
      ? (productName = this.getFormFields.bank.value.bankCode)
      : transferType === this.transferType.BUY_AIRTIME
      ? (productName = this.getFormFields.telco.value.telco)
      : transferType === this.transferType.MOBILE_MONEY
      ? (productName = this.getFormFields.mobileWallet.value.wallet)
      : transferType === this.transferType.INTRA_BANK
      ? (productName = "Equity")
      : transferType === this.transferType.BUY_GOODS
      ? (productName = "BuyGoods")
      : transferType === this.transferType.INTRA_BANK
      ? (productName = "Equity")
      : "";

    // TODO:: Do product selction for bill payments

    return productName;
  }

  async perfomNameEquiry() {
    const account = await this.beneficiaryManagementService.accountSearch({
      accountNumber: this.getFormFields.accountNumber.value,
      bankCode: "54",
    });
    return account;
  }

  toggleFav(): void {
    this.beneficiaryForm
      .get("favourite")
      ?.setValue(!this.beneficiaryForm.get("favourite")?.value);
  }
}
