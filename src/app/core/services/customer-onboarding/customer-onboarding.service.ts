import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  companyDetails,
  CorporateVerify,
  Director,
} from '../../domain/customer-onboarding.model';
import urlList from '../service-list.json';
@Injectable({
  providedIn: 'root',
})
export class CustomerOnboardingService {
  constructor(private http: HttpClient) {}

  // Verify Corporate (Start Registration)
  verifyCorporate(payload: CorporateVerify): Observable<any> {
    return this.http.post<CorporateVerify>(
      environment.apiUrl + urlList.customerOnboarding.verifyCorporate,
      payload
    );
  }

  // Get the last stage filled
  getRegistrationStage(registrationNumber: string): Observable<any> {
    return this.http.get(
      environment.apiUrl +
        urlList.customerOnboarding.getCorporateRegistrationStage +
        registrationNumber
    );
  }

  // Get registration requirement details
  getRegistrationRequirements(): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.customerOnboarding.getRequiredDocuments
    );
  }

  // Register company details
  registerCompanyDetails(payload: companyDetails): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.customerOnboarding.addCorporateDetails,
      payload
    );
  }

  // Get Registration Summary
  getRegistrationSummary(corporateId: string): Observable<any> {
    return this.http.get(
      environment.apiUrl +
        urlList.customerOnboarding.getRegistrationSummary +
        corporateId
    );
  }

  // Upload corporate documents
  uploadCorporateDocuments(payload: any, corporateId: string): Observable<any> {
    return this.http.post(
      environment.apiUrl +
        urlList.customerOnboarding.uploadCorporateDocuments +
        corporateId,
      payload
    );
  }
}
