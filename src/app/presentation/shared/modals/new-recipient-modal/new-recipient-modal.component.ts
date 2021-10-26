import { CountryService } from './../../../../core/services/country/country.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { recipientModel } from 'src/app/core/domain/recipient.model';
import { NewRecipientService } from './../../../../core/services/new-recipient/new-recipient.service';
import { CountryModel } from 'src/app/core/domain/country.model';

@Component({
  selector: 'app-new-recipient-modal',
  templateUrl: './new-recipient-modal.component.html',
  styleUrls: ['./new-recipient-modal.component.scss']
})
export class NewRecipientModalComponent implements OnInit {
  selected: recipientModel;
  accountNumber: string;
  equityForm: FormGroup;
  visibility = true;
  countryMock: CountryModel[] = [
    { name: 'Kenya', flag: 'https://flagcdn.com/h60/ke.png' },
    { name: 'Democratic Republic of Congo', flag: 'https://flagcdn.com/h60/cd.png' },
    { name: 'Rwanda', flag: 'https://flagcdn.com/h60/rw.png' },
    { name: 'South Sudan', flag: 'https://flagcdn.com/h60/ss.png' },
    { name: 'Tanzania', flag: 'https://flagcdn.com/h60/tz.png' }
  ]

  constructor(
    readonly dialogRef: MatDialogRef<NewRecipientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: recipientModel,
    private readonly newRecipientService: NewRecipientService,
    private readonly countryService: CountryService
  ) {
    this.selected = this.newRecipientService.default;
    this.newRecipientService.data.subscribe((x) => this.selected = x);
  }

  ngOnInit(): void {
    this.initForm()
  }

  openCountries(): void {
    this.visibility = false;
    const modal = this.countryService.open(this.countryMock);
    modal.afterClosed().subscribe((data: CountryModel) => {
      this.visibility = true;
      this.selected = { ...this.selected, country: data };
    });
  }

  initForm(): void {
    this.equityForm = new FormGroup({
      accountNumber: new FormControl(null, [Validators.required]),
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  submit(): void {
    this.selected = { ...this.selected, account: this.equityForm.controls.accountNumber.value };
    console.log(this.selected);
    this.close();
  }

}
