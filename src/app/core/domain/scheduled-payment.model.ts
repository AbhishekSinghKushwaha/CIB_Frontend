export interface ScheduledPaymentModel {
  frequency: number;
  firstpayment: Date;
  lastpayment: Date;
  reminder: string
}
