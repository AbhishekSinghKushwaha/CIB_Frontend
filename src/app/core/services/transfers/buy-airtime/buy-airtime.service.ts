import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import urlList from "../../service-list.json";

@Injectable({
  providedIn: "root",
})
export class BuyAirtimeService {
  private dataSource = new BehaviorSubject<string>("service");
  currentData = this.dataSource.asObservable();

  constructor(private http: HttpClient) {}

  airtimePayload(payload: any): void {
    this.dataSource.next(payload);
  }

  buyAirtimeTransfer(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.buyAirtimeTransfer,
      payload
    );
  }

  getCharges(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.airtime.getCharges,
      payload
    );
  }

  getOperatorsCountries(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.airtime.getOperatorsCountries
    );
  }

  getOperators(countryCode: any): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.airtime.getOperators + countryCode
    );
  }
}
