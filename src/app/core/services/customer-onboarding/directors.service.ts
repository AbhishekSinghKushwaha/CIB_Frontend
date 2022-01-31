import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Director } from '../../domain/customer-onboarding.model';
import urlList from '../service-list.json';
@Injectable({
  providedIn: 'root',
})
export class DirectorsService {
  constructor(private http: HttpClient) {}

  // Add Director details
  addDirector(payload: Director, corporateId: string): Observable<any> {
    return this.http.post(
      environment.apiUrl +
        urlList.customerOnboarding.addDirectorDetails +
        corporateId,
      payload
    );
  }

  // Get list of directors
  getCompanyDirectors(corporateId: string): Observable<any> {
    return this.http.get(
      environment.apiUrl +
        urlList.customerOnboarding.getCompanyDirectors +
        corporateId
    );
  }

  // Delete Director
  deleteDirector(referenceId: string): Observable<any> {
    return this.http.post(
      environment.apiUrl +
        urlList.customerOnboarding.deleteCompanyDirector +
        referenceId,
      {}
    );
  }
}
