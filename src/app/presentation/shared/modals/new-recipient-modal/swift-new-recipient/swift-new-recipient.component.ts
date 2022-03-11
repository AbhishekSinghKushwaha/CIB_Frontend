import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CountryModel } from "src/app/core/domain/bank.model";

import { CountryService } from "src/app/core/services/modal-services/country.service";
import { NewRecipientService } from "src/app/core/services/modal-services/new-recipient.service";
import { countrySettings } from "src/app/core/utils/constants/country.settings";

@Component({
  selector: "app-swift-new-recipient",
  templateUrl: "./swift-new-recipient.component.html",
  styleUrls: ["./swift-new-recipient.component.scss"],
})
export class SwiftNewRecipientComponent implements OnInit {
  newRecipientForm: FormGroup;

  get getForm() {
    return this.newRecipientForm.controls;
  }

  countrySelectType = countrySettings.viewTypes.FLAG_AND_NAME;
  constructor(
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly dialogRef: MatDialogRef<SwiftNewRecipientComponent>,
    private readonly newRecipientService: NewRecipientService,
    private readonly countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.newRecipientForm = this.fb.group({
      country: ["", [Validators.required]],
      bank: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      accountNumber: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      IBANNumber: ["", [Validators.required]],
      streetAddress: ["", [Validators.required]],
      postalAddress: ["", [Validators.required]],
    });
  }

  subscribeEvents(): void {
    this.countryService.selectedCountry.subscribe((x) => {
      this.getForm.country.patchValue(x);
    });
  }

  setCountry(country: CountryModel) {
    this.getForm.country.patchValue(country);
  }

  submit() {
    this.newRecipientService.set(this.newRecipientForm.getRawValue());
    this.dialog.closeAll();
  }

  close() {
    this.dialogRef.close();
  }
}
