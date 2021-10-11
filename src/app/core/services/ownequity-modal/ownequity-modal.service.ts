import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CurrencySelectionComponent } from '../../../presentation/shared/modals/currency-selection/currency-selection.component';
import { SchedulePaymentComponent } from '../../../presentation/shared/modals/schedule-payment/schedule-payment.component';



@Injectable({
  providedIn: 'root'
})
export class OwnequityModalService {

  constructor(private readonly dialog: MatDialog) { }

  openCurrency(): void {
    this.dialog.open<CurrencySelectionComponent>(CurrencySelectionComponent, {
      disableClose: true,
    });
  }

  openSchedulePayment(): void {
    this.dialog.open<SchedulePaymentComponent>(SchedulePaymentComponent, {
      disableClose: true,
    });
  }
}
