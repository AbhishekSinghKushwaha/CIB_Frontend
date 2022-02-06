import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UniversalValidators } from 'ngx-validators';
import { MobileOperator } from 'src/app/core/domain/transfer.models';
import { NewRecipientService } from 'src/app/core/services/modal-services/new-recipient.service';

@Component({
  selector: 'app-mobile-money-new-recipient',
  templateUrl: './mobile-money-new-recipient.component.html',
  styleUrls: ['./mobile-money-new-recipient.component.scss'],
})
export class MobileMoneyNewRecipientComponent implements OnInit {
  mobileMoneyNewRecipientForm: FormGroup;

  @Input() transferType: string;
  constructor(
    private fb: FormBuilder,
    private newRecipientService: NewRecipientService,
    private dialogRef: MatDialogRef<MobileMoneyNewRecipientComponent>,
    private readonly dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private selectedOperator: MobileOperator
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.mobileMoneyNewRecipientForm = this.fb.group({
      phoneNumber: [
        '',
        [UniversalValidators.isNumber, UniversalValidators.noWhitespace],
      ],
    });
  }

  submit() {
    // TODO:: Mobile Operator Name Search i.e for the case of safaricom
    const data = {
      mobileOperator: this.selectedOperator,
      ...this.mobileMoneyNewRecipientForm.getRawValue(),
    };
    this.newRecipientService.set(data);
    this.dialog.closeAll();
  }

  close() {
    this.dialogRef.close();
  }
}
