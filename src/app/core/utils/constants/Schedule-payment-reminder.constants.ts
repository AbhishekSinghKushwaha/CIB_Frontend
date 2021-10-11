import { Injectable } from '@angular/core';
import { ReminderSelectionModal } from '../../domain/schedule-payment-reminder.model';

@Injectable()
export class ReminderSelectionConstants {
  constructor() { }
  REMINDER_LISTINGS: ReminderSelectionModal[] = [{
    text: '1 day before',
  }, {
    text: '2 days before',
  }, {
    text: '3 days before',
  }, {
    text: '1 week before',
  }];
}