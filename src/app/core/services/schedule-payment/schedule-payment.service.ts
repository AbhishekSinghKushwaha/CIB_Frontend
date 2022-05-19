import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import * as moment from "moment";
import { Observable, Subject } from "rxjs";
import { PaymentFrequencyModalComponent } from "src/app/presentation/shared/modals/payment-frequency-modal/payment-frequency-modal.component";
import { PaymentReminderModalComponent } from "src/app/presentation/shared/modals/payment-reminder-modal/payment-reminder-modal.component";
import { FrequencySelectionComponent } from "src/app/presentation/shared/modals/schedule-payment/frequency-selection/frequency-selection.component";
import { ReminderSelectionComponent } from "src/app/presentation/shared/modals/schedule-payment/reminder-selection/reminder-selection.component";
import { SchedulePaymentComponent } from "../../../presentation/shared/modals/schedule-payment/schedule-payment.component";
import {
  FrequencySelectionModel,
  ReminderSelectionModel,
  ScheduledPaymentModel,
} from "../../domain/scheduled-payment.model";
import { SchedulePaymentConstants } from "../../utils/constants/schedule-payment.constants";
import { TransactionTypeConstants } from "../../utils/constants/transaction-type.constants";
import { StateService } from "../state/state.service";

interface SchedulePaymentState {
  scheduledPayment: ScheduledPaymentModel;
  reminder: ReminderSelectionModel;
  frequency: FrequencySelectionModel;
}

const initialSchedulePaymentState: SchedulePaymentState = {
  scheduledPayment: {
    frequency: {},
    reminderDay: {},
    startDate: new Date(),
    endDate: new Date(),
  },
  reminder: TransactionTypeConstants.ReminderListings[0],
  frequency: TransactionTypeConstants.FrequencyListings[0],
};
@Injectable({
  providedIn: "root",
})
export class SchedulePaymentService extends StateService<SchedulePaymentState> {
  scheduledPayment$: Observable<ScheduledPaymentModel> = this.select(
    (state) => state.scheduledPayment
  );

  frequency$: Observable<FrequencySelectionModel> = this.select(
    (state) => state.frequency
  );

  reminder$: Observable<ReminderSelectionModel> = this.select(
    (state) => state.reminder
  );
  dialogRef: any;

  constructor(private readonly dialog: MatDialog) {
    super(initialSchedulePaymentState);
  }

  // Open the schedule payment modal
  openSchedulePaymentModal(data: ScheduledPaymentModel): void {
    this.dialogRef = this.dialog.open<
      SchedulePaymentComponent,
      ScheduledPaymentModel
    >(SchedulePaymentComponent, {
      disableClose: true,
      data,
    });
  }

  // Open the frequency selection modal
  openFrequencySelectionModal(data: FrequencySelectionModel[]): void {
    this.dialog.open<PaymentFrequencyModalComponent, FrequencySelectionModel[]>(
      PaymentFrequencyModalComponent,
      {
        disableClose: false,
        data,
      }
    );
  }

  // Open the set reminder modal
  openReminderSelectionModal(data: ReminderSelectionModel[]): void {
    this.dialog.open<PaymentReminderModalComponent, ReminderSelectionModel[]>(
      PaymentReminderModalComponent,
      {
        disableClose: false,
        data,
      }
    );
  }

  setFrequency(frequency: FrequencySelectionModel): void {
    this.setState({ frequency });
  }

  setReminder(reminder: ReminderSelectionModel): void {
    this.setState({ reminder });
  }

  setScheduledPayment(scheduledPayment: ScheduledPaymentModel): void {
    this.setState({ scheduledPayment });
  }

  close() {
    this.dialogRef.close();
  }
}
