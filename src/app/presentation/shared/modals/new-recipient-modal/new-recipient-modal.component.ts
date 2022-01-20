import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { recipientModel } from 'src/app/core/domain/recipient.model';
import { NewRecipientService } from '../../../../core/services/modal-services/new-recipient.service';
import { CountryModel } from 'src/app/core/domain/bank.model';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { countrySettings } from 'src/app/core/utils/constants/country.settings';
import { IntrabankService } from 'src/app/core/services/transfers/intrabank/intrabank.service';
import { CountryService } from 'src/app/core/services/modal-services/country.service';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
@Component({
  selector: 'app-new-recipient-modal',
  templateUrl: './new-recipient-modal.component.html',
  styleUrls: ['./new-recipient-modal.component.scss'],
})
export class NewRecipientModalComponent implements OnInit {
  selected: any; // TODO:: Give the correct interface for account details
  accountNumber: string;
  newRecipientForm: FormGroup;
  country: CountryModel;
  countrySelectType = countrySettings.viewTypes.FLAG_AND_NAME;

  transferType = TransactionTypeConstants.TransferType;

  constructor(
    readonly dialogRef: MatDialogRef<NewRecipientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
}
