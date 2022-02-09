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

interface ProductsState {
  selectedProducts: Product[];
  selectedProduct: Product;
  selectedServices: ProductService[];
}

const initialState: ProductsState = {
  selectedProducts: [],
  selectedServices: [],
  selectedProduct: {
    id: '',
    productName: '',
    productServices: [],
    description: '',
  },
};
@Injectable({
  providedIn: 'root',
})
export class ProductsAndServicesService extends StateService<ProductsState> {
  selectedProduct$: Observable<Product> = this.select(
    (state) => state.selectedProduct
  );

  selectedProducts$: Observable<Product[]> = this.select(
    (state) => state.selectedProducts
  );
  constructor(private http: HttpClient) {
    super(initialState);
  }

  selectProduct(product: Product) {
    this.setState({ selectedProduct: product });
  }

  selectedProducts(selectedProducts: Product[]) {
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
