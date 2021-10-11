import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { recipientModel } from 'src/app/core/domain/recipient.model';
import { NewRecipientService } from './../../../../core/services/new-recipient/new-recipient.service';

@Component({
  selector: 'app-new-recipient-modal',
  templateUrl: './new-recipient-modal.component.html',
  styleUrls: ['./new-recipient-modal.component.scss']
})
export class NewRecipientModalComponent implements OnInit {
  selected: recipientModel;
  accountNumber: string;
  equityForm: FormGroup;

  constructor(
    readonly dialogRef: MatDialogRef<NewRecipientModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: recipientModel,
    private readonly newRecipientService: NewRecipientService
  ) {
    this.selected = this.newRecipientService.default;
    this.newRecipientService.data.subscribe((x) => this.selected = x);
  }

  ngOnInit(): void {
    this.initForm()
  }

  openCountries():void{

  }

  initForm():void{
    this.equityForm = new FormGroup({
      accountNumber: new FormControl(null, [Validators.required]),
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  submit():void{

  }

}
