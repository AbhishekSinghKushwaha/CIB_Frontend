import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { recipientModel } from 'src/app/core/domain/recipient.model';
import { NewRecipientService } from './../../../../core/services/new-recipient/new-recipient.service';
import { CountryModel } from 'src/app/core/domain/country.model';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { countrySettings } from 'src/app/core/utils/constants/country.settings';

@Component({
  selector: 'app-new-recipient-modal',
  templateUrl: './new-recipient-modal.component.html',
  styleUrls: ['./new-recipient-modal.component.scss']
})
export class NewRecipientModalComponent implements OnInit {
  selected: recipientModel;
  accountNumber: string;
  equityForm: FormGroup;
  country: CountryModel;
  countrySelectType = countrySettings.viewTypes.FLAG_AND_NAME;

  constructor(
    readonly dialogRef: MatDialogRef<NewRecipientModalComponent>,
    private readonly newRecipientService: NewRecipientService,
    @Inject(MAT_DIALOG_DATA) public data: recipientModel,
  ) {
    this.selected = this.newRecipientService.default;
    this.newRecipientService.data.subscribe((x) => this.selected = x);
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.equityForm = new FormGroup({
      accountNumber: new FormControl(null, [Validators.required]),
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  setCountry(country: CountryModel) {
    this.selected = { ...this.selected, country }
  }

  submit(): void {
    this.selected = { ...this.selected, account: this.equityForm.controls.accountNumber.value };
    this.close();
  }

}
