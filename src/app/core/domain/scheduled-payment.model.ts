export interface ScheduledPaymentModel {
  frequency: number;
  startDate: Date;
  endDate: Date;
  reminderDay: number;
}
export interface FrequencySelectionModel {
  frequency: string;
  description?: string;
  value: number;
}

export interface ReminderSelectionModel {
  reminder: string;
  description?: string;
  value: number;
}
