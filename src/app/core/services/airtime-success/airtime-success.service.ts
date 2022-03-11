import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AirtimeSuccessService {

  private dataSource = new BehaviorSubject<string>('service');
  currentData = this.dataSource.asObservable();

  constructor() { }

  airtimeSuccess(paymentData: any) {
    this.dataSource.next(paymentData);
    console.log(this.currentData,"paymentData");
  }

}
