import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentFrequencyModel } from 'src/app/core/domain/payment-frequency.model';
import { PaymentFrequencyService } from 'src/app/core/services/payment-frequency/payment-frequency.service';

@Component({
  selector: 'app-schedule-payment',
  templateUrl: './schedule-payment.component.html',
  styleUrls: ['./schedule-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulePaymentComponent implements OnInit {
  frequency: PaymentFrequencyModel;
  mockFrequency: PaymentFrequencyModel[]=[{
    text:'Once-off',
    subText:'Description',
  },{
    text:'Daily',
    subText:'Description',
  },{
    text:'Weekly',
    subText:'Description',
  },{
    text:'Monthly',
    subText:'Description',
  }];

  constructor(
    readonly dialogRef: MatDialogRef<SchedulePaymentComponent>,
    private readonly paymentFrequencyService:PaymentFrequencyService
  ) { }

  ngOnInit(): void {
    this.paymentFrequencyService.selected.subscribe(x => this.frequency = x);
  }

  close(): void {
    this.dialogRef.close(true);
  }

  openFrequency():void{
    this.paymentFrequencyService.open(this.mockFrequency);
  }
}
