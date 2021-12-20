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
  
  buyGoods(payload: any) {
    this.dataSource.next(payload);
    console.log(this.currentData,"Current Data");
  }

  sendToBuyGoods(payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.transfers.sendOwnEquityAccount, payload);
  }

  getTransferCharges(payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.transfers.getTransferCharges, payload);
  }
}
