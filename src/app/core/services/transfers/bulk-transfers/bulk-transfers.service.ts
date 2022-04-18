import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../../service-list.json';

@Injectable({
  providedIn: 'root'
})
export class BulkTransfersService {

  constructor(private http: HttpClient) { }

  // Upload corporate documents
  uploadCorporateDocuments(payload: any, corporateId: string): Observable<any> {
    return this.http.post(
      environment.apiUrl +
        urlList.customerOnboarding.uploadCorporateDocuments +
        corporateId,
        payload,{
        reportProgress: true, observe: 'events' }
    );
  }
}
