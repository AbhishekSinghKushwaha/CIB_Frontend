import { Component, OnInit, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { BankService } from "src/app/core/services/modal-services/bank.service";

import { CountryService } from "src/app/core/services/modal-services/country.service";
import { countrySettings } from "src/app/core/utils/constants/country.settings";
import { Subject, Subscription } from "rxjs";
import {
  mockData,
  TransactionType,
} from "src/app/core/utils/constants/mockdata.constants";
import { CountryModel } from "src/app/core/domain/bank.model";
import { NewRecipientService } from "src/app/core/services/modal-services/new-recipient.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { IntercountryService } from "src/app/core/services/transfers/intercountry/intercountry.service";

@Component({
  selector: "app-intercountry-new-recipient",
  templateUrl: "./intercountry-new-recipient.component.html",
  styleUrls: ["./intercountry-new-recipient.component.scss"],
})
export class IntercountryNewRecipientComponent implements OnInit {
  interCountryNewRecipientForm: FormGroup;
  countrySelectType = countrySettings.viewTypes.NAME_ONLY;
  country: CountryModel;
  visibility = true;
  viewTypes = countrySettings.viewTypes;
  subscriptions: Subscription[] = [];
  @Input() category: string;
  @Output() selected = new Subject<CountryModel>();

  transferType = TransactionTypeConstants.TransferType;

  constructor(
    readonly dialogRef: MatDialogRef<IntercountryNewRecipientComponent>,
    private newRecipientService: NewRecipientService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private readonly intercountryService: IntercountryService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {}

  initForm() {
    this.interCountryNewRecipientForm = this.fb.group({
      country: ["", [Validators.required]],
      accountNumber: ["", [Validators.required]],
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  submit() {
    const payload = {
      accountNumber:
        this.interCountryNewRecipientForm.controls.accountNumber.value,
      bankCode: "54", // TODO:: Countercheck this service
    };
    this.intercountryService.accountSearch(payload).subscribe((res) => {
      if (res.status) {
        const setAccount = {
          accountNumber:
            this.interCountryNewRecipientForm.controls.accountNumber.value,
          balance: 1000000, // TODO:: Work on the balance
          currency: res.data.currency,
          accountName: res.data.accountName,
          country: this.interCountryNewRecipientForm.controls.country.value,
        };
        this.newRecipientService.set(setAccount);
        this.dialog.closeAll();
      } else {
        alert(res.message);
        // TODO:: Throw Error
      }
    });
  }
}
