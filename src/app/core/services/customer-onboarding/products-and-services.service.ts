import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../service-list.json';
@Injectable({
  providedIn: 'root',
})
export class ProductsAndServicesService {
  constructor(private http: HttpClient) {}

  addProductAndServiceToCorporate(
    payload: any,
    corporateId: string
  ): Observable<any> {
    return this.http.post(
      environment.apiUrl +
        urlList.customerOnboarding.addCorporateProduct +
        corporateId,
      payload
    );
  }

  // Get corporate products
  getCorporateProducts(corporateId: string): Observable<any> {
    return this.http.get(
      environment.apiUrl +
        urlList.customerOnboarding.getCorporateProducts +
        corporateId
    );
  }

  // Remove corporate product
  removeProductAndService(corporateId: string, payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl +
        urlList.customerOnboarding.removeCorporateProduct +
        corporateId,
      payload
    );
  }
}
