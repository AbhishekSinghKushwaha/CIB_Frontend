import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EazzyFxRate } from '../eazzy-fx-rate/eazzy-fx-rate.component';
import { EazzyFxRateService } from '../services/eazzy-fx-rate.service';

@Component({
  selector: 'app-eazzy-fx-rates',
  templateUrl: './eazzy-fx-rates.component.html',
  styleUrls: ['./eazzy-fx-rates.component.scss'],
})
export class EazzyFxRatesComponent implements OnInit, OnDestroy {
  rates: EazzyFxRate[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly eazzyFxRateService: EazzyFxRateService) {}

  ngOnInit(): void {
    this.eazzyFxRateService
      .getRates()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result: EazzyFxRate[]) => {
        this.rates = result.filter(
          (eazzyFixRate: EazzyFxRate) => eazzyFixRate.fromCurrency === 'KES'
        );
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
