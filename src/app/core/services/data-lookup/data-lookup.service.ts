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
  getRoles(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.customerOnboarding.getRoles
    );
  }

  // Get Products and services for onboarding
  getProductsAndServices(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.customerOnboarding.getProductsAndServices
    );
  }

  // Get sectors / Transaction BCC Code for swift/ Payment Category
  getSectors(): Observable<any> {
    return this.http.get(environment.apiUrl + urlList.dataLookUp.getSectors);
  }
}
