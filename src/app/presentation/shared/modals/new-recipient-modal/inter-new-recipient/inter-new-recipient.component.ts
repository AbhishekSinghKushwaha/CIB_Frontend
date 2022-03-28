import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BankService } from 'src/app/core/services/modal-services/bank.service';
import { NewRecipientService } from 'src/app/core/services/modal-services/new-recipient.service';

@Component({
  selector: 'app-inter-new-recipient',
  templateUrl: './inter-new-recipient.component.html',
  styleUrls: ['./inter-new-recipient.component.scss'],
})
export class InterNewRecipientComponent implements OnInit {
  interBankTransferNewRecipientForm: FormGroup;
  @Input() transferType: string;
  constructor(
    readonly dialogRef: MatDialogRef<InterNewRecipientComponent>,
    private newRecipientService: NewRecipientService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.interBankTransferNewRecipientForm = this.fb.group({
      bank: ['', [Validators.required]],
      accountName: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  submit() {
    if (this.interBankTransferNewRecipientForm.valid) {
      this.newRecipientService.set(
        this.interBankTransferNewRecipientForm.getRawValue()
      );
      this.dialog.closeAll();
    }
  }
}
