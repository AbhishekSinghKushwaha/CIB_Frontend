import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class StandingOrdersService {

  private dataSource = new BehaviorSubject<string>('service');
  currentData = this.dataSource.asObservable();

  constructor(private http: HttpClient) { }

  standingOrderPayload(payload: any): void {
    this.dataSource.next(payload);
    console.log(payload);
  }

  createStandingOrder(payload: any): Observable<any> {
    return this.http.post(environment.apiUrl + urlList.standingOrders.createStandingOrder, payload);
  }

  editStandingOrder(payload: any): Observable<any> {
    return this.http.put(environment.apiUrl + urlList.standingOrders.editStandingOrder, payload);
  }

  getStandingOrders(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.standingOrders.getStandingOrders);
  }

  deleteStandingOrder(id: number): Observable<any> {
    return this.http.delete(environment.apiUrl + urlList.standingOrders.deleteStandingOrder + "?Id=" + id);
  }

  deactivateStandingOrder(deactivatePayload: any): Observable<any> {
    return this.http.put(environment.apiUrl + urlList.standingOrders.deactivateStandingOrder, deactivatePayload );
  }

  getScheduleId(id: any): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.standingOrders.getScheduleId + "?Id=" + id);
  }

  getTransferCharges(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.getTransferCharges,
      payload
    );
  }
}
