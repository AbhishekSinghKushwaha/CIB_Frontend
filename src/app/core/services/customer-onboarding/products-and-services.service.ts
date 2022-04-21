import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Product,
  ProductService,
} from '../../domain/customer-onboarding.model';
import urlList from '../service-list.json';
import { StateService } from '../state/state.service';

interface ProductsState<T, U> {
  selectedProducts: T[];
  selectedProduct: T | any;
  selectedServices: U[];
}
@Injectable({
  providedIn: 'root',
})
export class ProductsAndServicesService<T, U> extends StateService<ProductsState<T, U>> {

  selectedProduct$: Observable<T> = this.select(
    (state) => state.selectedProduct
  );

  selectedProducts$: Observable<T[]> = this.select(
    (state) => state.selectedProducts
  );
  constructor(private http: HttpClient) {
    super({
      selectedProducts: [],
      selectedServices: [],
      selectedProduct: {},
    });
  }

  selectProduct(product: T) {
    this.setState({ selectedProduct: product });
  }

  selectProducts(selectedProducts: T[]) {
    this.setState({ selectedProducts: selectedProducts });
  }

  /********HTTP CALLS***********/
  // Add product and service
  addProductAndServiceToCorporate(payload: any) {
    return {
      onboarding: (corporateId: string) => this.http.post(
        environment.apiUrl +
        urlList.customerOnboarding.addCorporateProduct +
        corporateId,
        payload
      ),
      userManagement: (username: string) => this.http.put(
        `${environment.apiUrl}${urlList.userManagement.getUser}${username}/SubProducts`,
        payload
      ),

    };
  }

  addRoleToCorporate(payload: any, username: string) {
    return this.http.put(
      `${environment.apiUrl}${urlList.userManagement.addUser}/${username}/Permissions`,
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

  // Update corporate product
  updateProductAndService(corporateId: string, payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl +
      urlList.customerOnboarding.updateCorporateProduct +
      corporateId,
      payload
    );
  }
}
