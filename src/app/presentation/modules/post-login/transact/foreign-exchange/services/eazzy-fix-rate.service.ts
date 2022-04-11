import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EazzyFixRate } from '../eazzy-fx-rate/eazzy-fx-rate.component';

@Injectable()
export class EazzyFixRateService {
  private rateSubject$: BehaviorSubject<EazzyFixRate[]> = new BehaviorSubject<
    EazzyFixRate[]
  >([
    {
      image: 'assets/images/usa.png',
      country: 'USA',
      currency: 'US Dollar',
      priceBuy: 0.84873,
      priceSell: 0.84873,
    },
    {
      image: 'assets/images/europe.png',
      country: 'EUR',
      currency: 'Euro',
      priceBuy: 0.84873,
      priceSell: 0.84873,
    },
    {
      image: 'assets/images/gb.png',
      country: 'GBP',
      currency: 'British Pound',
      priceBuy: 0.84873,
      priceSell: 0.84873,
    },
    {
      image: 'assets/images/zar.png',
      country: 'ZAR',
      currency: 'SA Rands',
      priceBuy: 0.84873,
      priceSell: 0.84873,
    },
    {
      image: 'assets/images/ugx.png',
      country: 'UGX',
      currency: 'Ugandan Shilling',
      priceBuy: 0.84873,
      priceSell: 0.84873,
    },
  ]);

  get rates$(): Observable<EazzyFixRate[]> {
    return this.rateSubject$.asObservable();
  }

  get rates(): EazzyFixRate[] {
    return this.rateSubject$.value;
  }

  constructor() {}
}
