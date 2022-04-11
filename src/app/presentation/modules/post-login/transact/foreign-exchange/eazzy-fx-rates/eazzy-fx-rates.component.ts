import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EazzyFixRate } from '../eazzy-fx-rate/eazzy-fx-rate.component';
import { EazzyFixRateService } from '../services/eazzy-fix-rate.service';

@Component({
  selector: 'app-eazzy-fx-rates',
  templateUrl: './eazzy-fx-rates.component.html',
  styleUrls: ['./eazzy-fx-rates.component.scss'],
})
export class EazzyFxRatesComponent implements OnInit, OnDestroy {
  rates: EazzyFixRate[] = [];

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private readonly eazzyFixRateService: EazzyFixRateService) {}

  ngOnInit(): void {
    this.eazzyFixRateService.rates$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((rates: EazzyFixRate[]) => (this.rates = rates));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
