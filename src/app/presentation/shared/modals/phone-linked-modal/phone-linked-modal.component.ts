import { Component, Input, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BankSelectionModel } from 'src/app/core/domain/bank-selection.model';
import { BankSelectionService } from 'src/app/core/services/bank-selection/bank-selection.service';
import { phoneLinkedModel } from 'src/app/core/domain/phone-linked.modal';
import { PhoneLinkedService } from 'src/app/core/services/phone-linked/phone-linked.service';


@Component({
  selector: 'app-phone-linked-modal',
  templateUrl: './phone-linked-modal.component.html',
  styleUrls: ['./phone-linked-modal.component.scss']
})
export class PhoneLinkedModalComponent implements OnInit {

  equityForm: FormGroup;
  bank: BankSelectionModel;
  data: phoneLinkedModel;

  mockBank: BankSelectionModel[] = [{
    name: 'Barclays Bank Kenya'
  }, {
    name: 'Commercial Bank of Africa'
  }, {
    name: 'Co-operative Bank'
  }, {
    name: 'Barclays Bank of Kenya'
  }, {
    name: 'KCB Bank'
  }];

  constructor(readonly dialogRef: MatDialogRef<PhoneLinkedModalComponent>,
    private readonly bankSelectionService: BankSelectionService,
    private readonly phoneLinkedService: PhoneLinkedService) 
    { 
      this.data = phoneLinkedService.default;
      this.eventsSubscriptions();
    }

    ngOnInit(): void {
      this.initForm();
    }
  
    initForm() {
      this.equityForm = new FormGroup({
        bank: new FormControl(this.data?.bank, [Validators.required]),
        phone: new FormControl(this.data?.phone, [Validators.required]),
      });
    }

    private eventsSubscriptions(): void {
      this.bankSelectionService.selected.subscribe(response => this.equityForm.controls.bank.setValue(response.name));
    }

    close(): void {
      this.dialogRef.close(true);
    }
  
    openBank(): void {
      this.bankSelectionService.open(this.mockBank);
    }
  
    submit() {
      this.phoneLinkedService.set(this.equityForm.value);
      this.phoneLinkedService.close();
    }

}
