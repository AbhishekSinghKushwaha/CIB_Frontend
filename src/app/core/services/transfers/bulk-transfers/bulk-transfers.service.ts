import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class BulkTransfersService {

  private dataSource = new BehaviorSubject<any[]>([]);
  currentData = this.dataSource.asObservable();

  public salaryPayment = new BehaviorSubject<boolean>(false);
  salaryMode = this.salaryPayment.asObservable();

  constructor(private http: HttpClient) { }

  bulkTransferPayload(payload: any[] = []): void {
    this.dataSource.next(Object.assign([],payload));
  }

  salaryPaymentEnabled(checked: boolean): void {
    this.salaryPayment.next(checked);
  }

  // deleteData(id: any){
  //   const deleteArr: any[] = this.dataSource.getValue();

  //   deleteArr.map((item) => {
  //     if (Number(item.id) == Number(id)) { 
  //       deleteArr.filter(item => item.id == id);
  //     }
  //   });
  //   this.dataSource.next(Object.assign([],deleteArr));
  //   console.log(this.currentData);
  // }

  bulkTransfer(payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.transfers.bulkTransfer, payload);
  }

  bulkTransferMultipleMode(payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.transfers.bulkTransferMultipleMode, payload);
  }

  getTransferCharges(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.getTransferCharges,
      payload
    );
  }
}
