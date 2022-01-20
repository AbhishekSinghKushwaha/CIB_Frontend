import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mobile-money-new-recipient',
  templateUrl: './mobile-money-new-recipient.component.html',
  styleUrls: ['./mobile-money-new-recipient.component.scss'],
})
export class MobileMoneyNewRecipientComponent implements OnInit {
  mobileMoneyNewRecipientForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  initForm() {
    this.mobileMoneyNewRecipientForm = this.fb.group({});
  }

  submit() {}

  close() {}
}
