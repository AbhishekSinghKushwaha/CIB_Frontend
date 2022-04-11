import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EazzyFxCurrencyModalService } from '../eazzy-fx-currency-modal/service/eazzy-fx-currency-modal.service';
import { EazzyFxGenerateDealModalService } from '../eazzy-fx-generate-deal-modal/services/eazzy-fx-generate-deal-modal.service';
import { EazzyFixRate } from '../eazzy-fx-rate/eazzy-fx-rate.component';
import { EazzyFixRateService } from '../services/eazzy-fix-rate.service';

@Component({
  selector: 'app-eazzy-fx-pair',
  templateUrl: './eazzy-fx-pair.component.html',
  styleUrls: ['./eazzy-fx-pair.component.scss'],
})
export class EazzyFxPairComponent implements OnInit {
  sourceRate: EazzyFixRate;
  destinationRate: EazzyFixRate;

  private sourceRateIndex: number = -1;
  private destinationRateIndex: number = -1;

  constructor(
    private readonly eazzyFixRateService: EazzyFixRateService,
    private readonly eazzyFxCurrencyModalService: EazzyFxCurrencyModalService,
    private readonly eazzyFxGenerateDealModalService: EazzyFxGenerateDealModalService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    const rates: EazzyFixRate[] = this.eazzyFixRateService.rates;

    this.sourceRate = rates[0];
    this.destinationRate = rates[1];
  }

  chooseSourceCurrency(): void {
    this.eazzyFxCurrencyModalService
      .open({
        title: 'Convert from',
        rates: this.eazzyFixRateService.rates,
        selectedIndex: this.sourceRateIndex,
      })
      .subscribe((result: number | undefined) => {
        if (result !== undefined) {
          this.sourceRateIndex = result;
          this.sourceRate = this.eazzyFixRateService.rates[result];
        }
      });
  }

  chooseDestinationCurrency(): void {
    this.eazzyFxCurrencyModalService
      .open({
        title: 'Convert to',
        rates: this.eazzyFixRateService.rates,
        selectedIndex: this.destinationRateIndex,
      })
      .subscribe((result: number | undefined) => {
        if (result !== undefined) {
          this.destinationRateIndex = result;
          this.destinationRate = this.eazzyFixRateService.rates[result];
        }
      });
  }

  generateDeal(): void {
    this.eazzyFxGenerateDealModalService.open();
  }

  negotiateDeal(): void {
    this.router.navigate(['transact/foreign-exchange/eazzy-fx/negotiate']);
  }
}
