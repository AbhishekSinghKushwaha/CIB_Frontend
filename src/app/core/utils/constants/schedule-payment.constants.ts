import { Injectable } from '@angular/core';
import {
  FrequencySelectionModel,
  ReminderSelectionModel,
} from '../../domain/scheduled-payment.model';

@Injectable()
export class SchedulePaymentConstants {
  constructor() {}
  FREQUENCY_LISTINGS: FrequencySelectionModel[] = [
    {
      frequency: 'Once-off',
      description: 'Description',
      value: 1,
    },
    {
      frequency: 'Daily',
      description: '',
      value: 2,
    },
    {
      frequency: 'Weekly',
      description: '',
      value: 3,
    },
    {
      frequency: 'Monthly',
      description: '',
      value: 4,
    },
    {
      frequency: 'Yearly',
      description: '',
      value: 5,
    },
  ];

  REMINDER_LISTINGS: ReminderSelectionModel[] = [
    {
      reminder: '1 day before',
      description: '',
      value: 1,
    },
    {
      reminder: '2 days before',
      description: '',
      value: 2,
    },
    {
      reminder: '3 days before',
      description: '',
      value: 3,
    },
    {
      reminder: '1 week before',
      description: '',
      value: 4,
    },
  ];
}
