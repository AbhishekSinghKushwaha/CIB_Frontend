export interface ScheduledPaymentModel {
  frequency: FrequencySelectionModel;
  startDate: Date;
  endDate: Date;
  reminderDay: ReminderSelectionModel;
}
export interface FrequencySelectionModel {
  frequency?: string;
  description?: string;
  value?: number;
}

export interface ReminderSelectionModel {
  reminder?: string;
  description?: string;
  value?: number;
}
