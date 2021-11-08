import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { recipientModel } from 'src/app/core/domain/recipient.model';
import { NewRecipientService } from './../../../../core/services/new-recipient/new-recipient.service';
import { CountryModel } from 'src/app/core/domain/country.model';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { countrySettings } from 'src/app/core/utils/constants/country.settings';
import { IntrabankService } from 'src/app/core/services/transfers/intrabank/intrabank.service';
@Component({
  selector: 'app-new-recipient-modal',
  templateUrl: './new-recipient-modal.component.html',
  styleUrls: ['./new-recipient-modal.component.scss']
})
export class NewRecipientModalComponent implements OnInit {
  selected: any; // TODO:: Give the correct interface for account details
  accountNumber: string;
  newRecipientForm: FormGroup;
  country: CountryModel;
  countrySelectType = countrySettings.viewTypes.FLAG_AND_NAME;

  constructor(
    private dialog: MatDialog,
    readonly dialogRef: MatDialogRef<NewRecipientModalComponent>,
    private readonly newRecipientService: NewRecipientService,
    @Inject(MAT_DIALOG_DATA) public data: recipientModel,
    private intraBankTransferService: IntrabankService
  ) {
    this.selected = this.newRecipientService.default;
    this.newRecipientService.data.subscribe((x) => this.selected = x);
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.newRecipientForm = new FormGroup({
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
    // Do the Name search to return account details
    const payload = {
      accountNumber: this.newRecipientForm.controls.accountNumber.value,
      bankCode: '54' // TODO:: Countercheck this service
    }
    // this.intraBankTransferService.accountSearch(payload).subscribe(res => {
    //   if (res.status) {

    //   } else {
    //     // TODO:: Throw Error
    //   }
    // })
    this.selected = { accountNumber: this.newRecipientForm.controls.accountNumber.value, balance: 10000, currency: 'KES', accountName: 'EMMANUEL SAMUEL KIANGAI MACHARIA'};
    this.newRecipientService.set(this.selected)
    this.dialog.closeAll();
  }

}
