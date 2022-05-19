import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EazzyFxCurrencyModalService } from '../eazzy-fx-currency-modal/service/eazzy-fx-currency-modal.service';
import { EazzyFxGenerateDealModalService } from '../eazzy-fx-generate-deal-modal/services/eazzy-fx-generate-deal-modal.service';
import { EazzyFxRate } from '../eazzy-fx-rate/eazzy-fx-rate.component';
import { EazzyFxRateService } from '../services/eazzy-fx-rate.service';

@Component({
  selector: 'app-eazzy-fx-pair',
  templateUrl: './eazzy-fx-pair.component.html',
  styleUrls: ['./eazzy-fx-pair.component.scss'],
})
export class EazzyFxPairComponent implements OnInit {
  rates: EazzyFxRate[];
  sourceRate: EazzyFxRate;
  destinationRate: EazzyFxRate;

  private sourceRateIndex: number = -1;
  private destinationRateIndex: number = -1;

  constructor(
    private readonly eazzyFxRateService: EazzyFxRateService,
    private readonly eazzyFxCurrencyModalService: EazzyFxCurrencyModalService,
    private readonly eazzyFxGenerateDealModalService: EazzyFxGenerateDealModalService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.eazzyFxRateService.getRates().subscribe((result) => {
      this.rates = result;

      this.sourceRate = this.rates[0];
      this.destinationRate = this.rates[1];
    });
  }

  chooseSourceCurrency(): void {
    this.eazzyFxCurrencyModalService
      .open({
        title: 'Convert from',
        rates: this.rates,
        selectedIndex: this.sourceRateIndex,
      })
      .subscribe((result: number | undefined) => {
        if (result !== undefined) {
          this.sourceRateIndex = result;
          this.sourceRate = this.rates[result];
        }
      });
  }

  chooseDestinationCurrency(): void {
    this.eazzyFxCurrencyModalService
      .open({
        title: 'Convert to',
        rates: this.rates,
        selectedIndex: this.destinationRateIndex,
      })
      .subscribe((result: number | undefined) => {
        if (result !== undefined) {
          this.destinationRateIndex = result;
          this.destinationRate = this.rates[result];
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
