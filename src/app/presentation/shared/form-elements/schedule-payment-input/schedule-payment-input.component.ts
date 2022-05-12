import { Component, forwardRef, Input, OnInit } from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { ScheduledPaymentModel } from "src/app/core/domain/scheduled-payment.model";
import { SchedulePaymentService } from "src/app/core/services/schedule-payment/schedule-payment.service";
import * as moment from "moment";

export interface Value {
  value?: string;
  reminder?: string;
}
@Component({
  selector: "app-schedule-payment-input",
  templateUrl: "./schedule-payment-input.component.html",
  styleUrls: ["./schedule-payment-input.component.scss"],
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

  public value: Value = {};

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

  public writeValue(value: {}): void {
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
    this.schedulePaymentService.scheduledPayment$.subscribe((res) => {
      this.formatView(res);
    });
  }

  formatView(scheduledPayment: ScheduledPaymentModel) {
    switch (scheduledPayment.frequency.value) {
      case 1: // Once off frequncy
        if (moment(scheduledPayment.startDate).isAfter(moment())) {
          this.value.value = `On this day, ${moment().format("MMMM Do YYYY")}`;
        } else {
          this.value.value = `Today, ${moment().format("MMMM Do YYYY")}`;
        }
        this.value.reminder = scheduledPayment.reminderDay?.reminder;
        break;
      case 2: // Daily
        this.value.value = `Everyday from ${moment(
          scheduledPayment.startDate
        ).format("MMM Do")} to ${moment(scheduledPayment.endDate).format(
          "MMM Do"
        )}`;
        this.value.reminder = scheduledPayment.reminderDay?.reminder;
        break;
      case 3: // Weekly
        this.value.value = `Every week on ${moment().format("dddd")}`;
        this.value.reminder = scheduledPayment.reminderDay?.reminder;
        break;
      case 4: // Monthly
        this.value.value = `Every month on the ${moment().format("Do")}`;
        this.value.reminder = scheduledPayment.reminderDay?.reminder;
        break;
      case 5: // Yearly
        this.value.value = `Every year on ${moment(
          scheduledPayment.startDate
        ).format("MMM Do")}`;
        this.value.reminder = scheduledPayment.reminderDay?.reminder;
        break;
      default:
        break;
    }
    this.parentForm.controls[this.fieldName].setValue(scheduledPayment);
  }
}
