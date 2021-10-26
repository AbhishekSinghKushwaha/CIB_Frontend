export interface ScheduledPaymentModel {
  frequency: number;
  startDate: Date;
  endDate: Date;
  reminder: string
}
