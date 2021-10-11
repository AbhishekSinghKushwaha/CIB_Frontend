import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { PaymentFrequencyModalComponent } from 'src/app/presentation/shared/modals/payment-frequency-modal/payment-frequency-modal.component';
import { PaymentFrequencyModel } from '../../domain/payment-frequency.model';

@Injectable()
export class PaymentFrequencyService {
  selected = new Subject<PaymentFrequencyModel>();
  private data:PaymentFrequencyModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: PaymentFrequencyModel[]): void {
    this.dialog.open<PaymentFrequencyModalComponent, PaymentFrequencyModel[]>(PaymentFrequencyModalComponent, {
      disableClose: false,
      data
    });
  }

  select(input: PaymentFrequencyModel): void {
    this.data = input;
    this.selected.next(this.data)
  }

  get default(): PaymentFrequencyModel {
    return this.data;
  }
}
