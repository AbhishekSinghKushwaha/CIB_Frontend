import { Component, OnInit, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { BankService } from "src/app/core/services/modal-services/bank.service";

import { CountryService } from "src/app/core/services/modal-services/country.service";
import { countrySettings } from "src/app/core/utils/constants/country.settings";
import { Subject, Subscription } from "rxjs";
import { mockData } from "src/app/core/utils/constants/mockdata.constants";
import { CountryModel } from "src/app/core/domain/bank.model";
import { NewRecipientService } from "src/app/core/services/modal-services/new-recipient.service";
import { StorageService } from "src/app/core/services/storage/storage.service";

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

  constructor(
    readonly dialogRef: MatDialogRef<IntercountryNewRecipientComponent>,
    private newRecipientService: NewRecipientService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private readonly countryService: CountryService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeEvents();
  }

  openCountries(): void {
    this.visibility = false;
    const modal = this.countryService.openCountry(
      this.storageService.getData("countries"),
      this.category
    );
    this.subscriptions.push(
      modal.afterClosed().subscribe((data: CountryModel) => {
        console.log("Inner", data);
        this.countryService.openedStatus.next(false);
        this.visibility = true;
        this.selected.next(data);
      })
    );
  }

  ngOnDestroy(): void {
    const modal = this.countryService.openCountry(
      this.storageService.getData("countries"),
      this.category
    );
    this.subscriptions.push(
      modal.afterClosed().subscribe((data: CountryModel) => {
        this.countryService.openedStatus.next(false);
        this.visibility = true;
        this.selected.next(data);
      })
    );
    this.subscriptions.length &&
      this.subscriptions.forEach((value) => value && value.unsubscribe());
  }

  initForm() {
    this.interCountryNewRecipientForm = this.fb.group({
      country: [""],
      bank: ["", [Validators.required]],
      accountName: ["", [Validators.required]],
      accountNumber: ["", [Validators.required]],
    });
  }

  subscribeEvents(): void {
    this.countryService.openedStatus.subscribe((response) =>
      response ? (this.visibility = false) : (this.visibility = true)
    );
  }

  close(): void {
    this.dialogRef.close(true);
  }

  setCountry(country: CountryModel) {
    this.country = country;
  }

  submit() {
    if (this.interCountryNewRecipientForm.valid) {
      this.newRecipientService.set(
        this.interCountryNewRecipientForm.getRawValue()
      );
      this.dialog.closeAll();
    }
  }
}
