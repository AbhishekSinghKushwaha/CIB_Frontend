import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubsidiaryModel } from 'src/app/core/domain/bank.model';
import { CountryModel } from 'src/app/core/domain/country.model';
import { recipientModel } from 'src/app/core/domain/recipient.model';
import { CountryService } from 'src/app/core/services/country/country.service';
import { NewRecipientService } from 'src/app/core/services/modal-services/new-recipient/new-recipient.service';
import { IntrabankService } from 'src/app/core/services/transfers/intrabank/intrabank.service';
import { countrySettings } from 'src/app/core/utils/constants/country.settings';
import { BaseTransactComponent } from 'src/app/presentation/modules/post-login/transact/base-transact.component';

@Component({
  selector: 'app-intra-new-recipient',
  templateUrl: './intra-new-recipient.component.html',
  styleUrls: ['./intra-new-recipient.component.scss'],
})
export class IntraNewRecipientComponent
  extends BaseTransactComponent
  implements OnInit
{
  selected: any; // TODO:: Give the correct interface for account details
  newRecipientForm: FormGroup;
  country: CountryModel;
  countrySelectType = countrySettings.viewTypes.FLAG_AND_NAME;

  constructor(
    private dialog: MatDialog,
    readonly dialogRef: MatDialogRef<IntraNewRecipientComponent>,
    private readonly newRecipientService: NewRecipientService,
    @Inject(MAT_DIALOG_DATA) public data: recipientModel,
    private readonly countryService: CountryService,
    private snackBar: MatSnackBar,
    private intraBankTransferService: IntrabankService
  ) {
    super(snackBar);
    this.selected = this.newRecipientService.default;
    this.newRecipientService.data.subscribe((x) => (this.selected = x));
  }

  ngOnInit(): void {
    this.initForm();
    this.subscribeEvents();
  }

  subscribeEvents(): void {
    // this.countryService.selected.subscribe((x) => this.country = x);
  }

  initForm(): void {
    this.newRecipientForm = new FormGroup({
      accountNumber: new FormControl(null, [Validators.required]),
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  setSubsidiary(subsidiary: SubsidiaryModel) {
    console.log(subsidiary);
    this.selected = subsidiary;
  }
  // Do the Name search to return account details
  submit(): void {
    const payload = {
      accountNumber: this.newRecipientForm.controls.accountNumber.value,
      bankCode: '54', // TODO:: Countercheck this service
    };
    this.intraBankTransferService.accountSearch(payload).subscribe((res) => {
      if (res.status) {
        this.selected = {
          accountNumber: this.newRecipientForm.controls.accountNumber.value,
          balance: 1000000,
          currency: res.data.currency,
          accountName: res.data.accountName,
        };
        this.newRecipientService.set(this.selected);
        this.dialog.closeAll();
      } else {
        alert(res.message);
        // TODO:: Throw Error
      }
    });
  }
}
