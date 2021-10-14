import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaymentReminderModalComponent } from 'src/app/presentation/shared/modals/payment-reminder-modal/payment-reminder-modal.component';
import { PaymentreminderModel } from '../../domain/payment-reminder.model';

@Injectable()
export class PaymentReminderService {
  data: PaymentreminderModel;
  selected = new Subject<PaymentreminderModel>();

  constructor(private readonly dialog: MatDialog) { }

  open(data: PaymentreminderModel[]): void {
    this.dialog.open<PaymentReminderModalComponent, PaymentreminderModel[]>(PaymentReminderModalComponent, {
      disableClose: false,
      data
    });
  }

  select(input: PaymentreminderModel): void {
    this.data = input;
    this.selected.next(this.data);
  }

  get default(): PaymentreminderModel {
    return this.data;
  }
}
