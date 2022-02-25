import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../../service-list.json';


@Injectable({
  providedIn: 'root'
})
export class BuyGoodsService {

  private dataSource = new BehaviorSubject<string>('service');
  currentData = this.dataSource.asObservable();

  constructor(private http: HttpClient) { }
  
  payBuyGoods(payload: any): Observable<any> {
    this.dataSource.next(payload);
    console.log(this.currentData,"Current Data");
    return this.http.post(environment.apiUrl + urlList.transfers.payBuyGoods, payload);
  }

  updateBuyGoods(payload: any): Observable<any> {
    this.dataSource.next(payload);
    console.log(this.currentData,"Current Data");
    return this.http.put(environment.apiUrl + urlList.transfers.payBuyGoods, payload);
  }

  getTransferCharges(payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.transfers.getTransferCharges, payload);
  }

  getMerchants(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.dataLookUp.getMerchants);
  }

  getFavouriteMerchants(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.dataLookUp.getFavouriteMerchants);
  }

  getMerchantDetails(tillNumber: string): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.dataLookUp.getMerchantDetails + tillNumber);
  }

  getFavouriteMerchantDetails(tillNumber: string): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.dataLookUp.getFavouriteMerchantDetails, tillNumber);
  }

  getTransactionStatus(referenceNumber: string): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.transactionStatus.getTransactionStatus + referenceNumber);
  }

  getLimit(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.dataLookUp.getLimit);
  }

  getCharges(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.transfers.getCharges);
  }
}
