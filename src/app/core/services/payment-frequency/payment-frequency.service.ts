import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { PaymentFrequencyModalComponent } from 'src/app/presentation/shared/modals/payment-frequency-modal/payment-frequency-modal.component';
import { PaymentFrequencyModel } from '../../domain/payment-frequency.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentFrequencyService {
  selected = new Subject<PaymentFrequencyModel>();

  constructor(private readonly dialog: MatDialog) { }

  open(data: PaymentFrequencyModel[]): void {
    this.dialog.open<PaymentFrequencyModalComponent, PaymentFrequencyModel[]>(PaymentFrequencyModalComponent, {
      disableClose: false,
      data
    });
  }

  select(input: PaymentFrequencyModel): void {
    this.selected.next(input)
  }
}
