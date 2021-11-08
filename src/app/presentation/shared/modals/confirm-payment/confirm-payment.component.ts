import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.component.html',
  styleUrls: ['./confirm-payment.component.scss']
})
export class ConfirmPaymentComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public paymentData: any) { }

  ngOnInit(): void {
    console.log(this.paymentData)
  }

  submitReview() {

  }

  close() {

  }

}
