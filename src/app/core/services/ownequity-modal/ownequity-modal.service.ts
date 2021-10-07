import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountSelectionModal } from '../../domain/account-selection.model';
import { CurrencySelectionComponent } from '../../../presentation/shared/modals/currency-selection/currency-selection.component';
import { SchedulePaymentComponent } from '../../../presentation/shared/modals/schedule-payment/schedule-payment.component';
import { AccountSelectionComponent } from '../../../presentation/shared/modals/account-selection/account-selection.component';



@Injectable({
  providedIn: 'root'
})
export class OwnequityModalService {

  constructor(private readonly dialog: MatDialog) { }

  openAccountSelection(data: AccountSelectionModal): void {
    this.dialog.open<AccountSelectionComponent, AccountSelectionModal>(AccountSelectionComponent, {
      disableClose: true,
      data
    });
  }

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
