import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BankModel } from "../../domain/bank.model";
import urlList from "../service-list.json";

@Injectable({
  providedIn: "root",
})
export class DataLookupService {
  constructor(private http: HttpClient) {}

  getUserData(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.userManagement.currentUserData
    );
  }

  // Get Banks in a particular country
  getBanks(country: string): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.dataLookUp.getBanks + country
    );
  }

  // Get subsidiaries (Countries equity operates in)
  getSubsidiaries(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.dataLookUp.getSubsidiaries
    );
  }

  getCountries(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.dataLookUp.getCountries);
  }

  // Get Roles for customer onboarding
  getRoles(): { onboarding: Observable<any>; userManagement: Observable<any> } {
    return {
      onboarding: this.http.get(
        environment.apiUrl + urlList.customerOnboarding.getRoles
      ),
      userManagement: this.http.get(
        environment.apiUrl + urlList.userManagement.getRoles
      ),
    };
  }

  // Get Products and services for onboarding
  getProductsAndServices(): {
    onboarding: Observable<any>;
    userManagement: Observable<any>;
  } {
    return {
      onboarding: this.http.get(
        environment.apiUrl + urlList.customerOnboarding.getProductsAndServices
      ),
      userManagement: this.http.get(
        environment.apiUrl + urlList.userManagement.getProductsAndServices
      ),
    };
  }

  // Get telcos
  getTelcos(countryCode: string): Observable<any> {
    const params = {
      countryCode,
    };
    return this.http.get(environment.apiUrl + urlList.dataLookUp.getTelcos, {
      params,
    });
  }

  // Get all supported currencies
  getCurrencies(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.dataLookUp.getCurrencies);
  }

  // Get mobile money transfer wallets offered by different telcos
  getMobileWallets(countryCode: string): Observable<any> {
    const params = {
      countryCode,
    };
    return this.http.get(
      environment.apiUrl + urlList.dataLookUp.getMobileWallets,
      { params }
    );
  }
  // Get sectors / Transaction BCC Code for swift/ Payment Category
  getSectors(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.dataLookUp.getSectors);
  }
}
