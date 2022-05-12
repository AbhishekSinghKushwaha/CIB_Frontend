import urlList from "../../service-list.json";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { StateService } from './../../state/state.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject } from "rxjs";

interface BillPaymentState {
  billCategoriesPayload: {}
}


const initialState: BillPaymentState = {
  billCategoriesPayload: {}
}

@Injectable({
  providedIn: 'root'
})
export class BillServiceService extends StateService<BillPaymentState> {
  private dataSource = new BehaviorSubject<string>("");
  public currentData = this.dataSource.asObservable();

  billPaymentPayload(payload: any): void {
    this.dataSource.next(payload);
  }

  billCategoriesPayload$: Observable<any> = this.select(
    (state) => state.billCategoriesPayload
  );

  constructor(private http: HttpClient) {
    super(initialState)
  }

  setBillCategories(billCategoriesPayload: any): void {
    this.setState({ billCategoriesPayload })
  }

  getCountries(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.transfers.bill.getCountries + '?PageIndex=2&PageSize=100'
    );
  }

  getCategories(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.transfers.bill.getCategories + '?PageIndex=2&PageSize=100'
    );
  }

  getBillersByCountry(country: any): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.transfers.bill.getBillersByCountry + '/' + country
    );
  }

  getBillersByCategoryAndCountry(category: any, country: string): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.transfers.bill.getBillersByCountry + `/${category}/${country}`
    );
  }

  postValidateBill(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.bill.postValidateBill,
      payload
    )
  }

  postPayBill(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.bill.postPayBill,
      payload
    )
  }

  postCompleteOtp(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.bill.postCompleteOtp,
      payload
    )
  }

  postResendOtp(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.bill.postResendOtp,
      payload
    )
  }

}
