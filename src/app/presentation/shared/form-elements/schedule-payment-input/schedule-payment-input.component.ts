import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ScheduledPaymentModel } from 'src/app/core/domain/scheduled-payment.model';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@Component({
  selector: 'app-schedule-payment-input',
  templateUrl: './schedule-payment-input.component.html',
  styleUrls: ['./schedule-payment-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SchedulePaymentInputComponent),
      multi: true,
    },
  ],
})
export class SchedulePaymentInputComponent
  implements ControlValueAccessor, OnInit
{
  paymentDate: ScheduledPaymentModel;

  @Input()
  public parentForm!: FormGroup;

  @Input()
  public fieldName: string;

  @Input()
  public label!: string;

  @Input()
  placeholder!: string;

  @Input()
  transactionType: string;

  public value!: string;

  public changed!: (value: string) => void;

  public touched!: () => void;

  public isDisabled!: boolean;

  get formField(): FormControl {
    return this.parentForm?.get(this.fieldName) as FormControl;
  }
  constructor(private schedulePaymentService: SchedulePaymentService) {}

  ngOnInit(): void {
    this.eventsSubscription();
  }

  public writeValue(value: string): void {
    this.value = value;
  }

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }

  public registerOnChange(fn: any): void {
    this.changed = fn;
  }

  public registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  openSchedulePaymentModal() {
    this.schedulePaymentService.openSchedulePaymentModal(this.paymentDate);
  }

  eventsSubscription(): void {
    this.schedulePaymentService.selectedSchedulePayment.subscribe((res) => {
      this.formatView(res);
    });
  }

  formatView(scheduledPayment: ScheduledPaymentModel) {
    let startDay = scheduledPayment.startDate.getDay();
    let endDate = scheduledPayment.endDate.getDay();
    console.log(startDay);
    switch (scheduledPayment.frequency) {
      case 1: // Once off frequncy
        break;
      case 2: // Daily
        break;
      case 3: // Weekly
        break;
      case 4: // Monthly
        break;
      case 5: // Yearly
        break;
      default:
        break;
    }
    // this.parentForm.controls.schedulePayment.setValue(scheduledPayment);
  }
}
