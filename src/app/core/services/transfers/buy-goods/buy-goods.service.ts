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

  private tillNumber = new BehaviorSubject<string>('service');
  currentTillNUmber = this.tillNumber.asObservable();

  constructor(private http: HttpClient) { }

  payBuyGoods(payload: any): void {
    this.dataSource.next(payload);
  }

  getTillNumber(tillNumber: any): void {
    this.tillNumber.next(tillNumber);
  }
  
  buyGoodsTransfer(payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.transfers.buyGoodsTransfer, payload);
  }

  getCharges(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.transfers.getCharges);
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
    return this.http.post(environment.apiUrl + urlList.dataLookUp.getFavouriteMerchantDetails + tillNumber, null);
  }
}
