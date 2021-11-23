import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { NewRecipientService } from 'src/app/core/services/new-recipient/new-recipient.service';

@Component({
  selector: 'app-inter-new-recipient',
  templateUrl: './inter-new-recipient.component.html',
  styleUrls: ['./inter-new-recipient.component.scss'],
})
export class InterNewRecipientComponent implements OnInit {
  interBankTransferNewRecipientForm: FormGroup;
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

  openBanks() {
    // const modal = this.bankService.open(mockData.banks);
    // if (this.modalMode) {
    //   this.visibility = false;
    //   modal.afterClosed().subscribe(() => {
    //     this.visibility = true;
    //   });
    // }
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
