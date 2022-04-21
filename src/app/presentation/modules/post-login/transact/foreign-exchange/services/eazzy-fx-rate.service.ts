import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EazzyFxRate } from '../eazzy-fx-rate/eazzy-fx-rate.component';
import urlList from '../../../../../../core/services/service-list.json';
import { map } from 'rxjs/operators';

@Injectable()
export class EazzyFxRateService {
  private rateSubject$: BehaviorSubject<EazzyFxRate[]> = new BehaviorSubject<
    EazzyFxRate[]
  >([]);

  constructor(private readonly httpClient: HttpClient) {}

  getRates(): Observable<EazzyFxRate[]> {
    return this.httpClient
      .get(environment.apiUrl + urlList.fx.getRates, {
        params: {
          Date: '2022-2-3',
          BankId: '54',
        },
      })
      .pipe(
        map((result: any) =>
          result.data.map((item: any) => ({
            buyRate: item.buyRate,
            sellRate: item.sellRate,
            fromCurrency: item.fromCurrency,
            toCurrency: item.toCurrency,
            image: `assets/images/usd.png`,
          }))
        )
      );
  }

  generate(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    isNegotiable: boolean,
    transactionType: number,
    transactionDate: string
  ): Observable<any> {
    return this.httpClient.post(environment.apiUrl + urlList.fx.generate, {
      fromCurrency,
      toCurrency,
      amount,
      isNegotiable,
      transactionType,
      transactionDate,
    });
  }
}
