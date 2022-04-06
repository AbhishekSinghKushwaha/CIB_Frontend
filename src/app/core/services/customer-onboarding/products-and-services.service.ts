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
