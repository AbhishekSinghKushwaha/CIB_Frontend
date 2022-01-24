import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NewRecipientService } from 'src/app/core/services/modal-services/new-recipient.service';

@Component({
  selector: 'app-buy-goods-new-recipient',
  templateUrl: './buy-goods-new-recipient.component.html',
  styleUrls: ['./buy-goods-new-recipient.component.scss'],
})
export class BuyGoodsNewRecipientComponent implements OnInit {
  newRecipientForm: FormGroup;

  get getForm() {
    return this.newRecipientForm.controls;
  }
  constructor(
    private readonly fb: FormBuilder,
    private dialogRef: MatDialogRef<BuyGoodsNewRecipientComponent>,
    private readonly newRecipientService: NewRecipientService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.newRecipientForm = this.fb.group({
      tillNumber: ['', [Validators.required]],
    });
  }

  // Do till number validation
  submit() {
    // Simulate api fetch for number validation with a 2 seconds delay
    setTimeout(() => {
      const data = {
        tillNumber: this.getForm.tillNumber.value,
        tillName: 'Diners Grill', // TODO:: Get this from api after validation
      };
      this.newRecipientService.set(data);
      this.dialog.closeAll();
    }, 2000);
  }

  close() {
    this.dialogRef.close();
  }
}
