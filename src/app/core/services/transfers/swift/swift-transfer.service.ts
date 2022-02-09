import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../../service-list.json';
@Injectable({
  providedIn: 'root',
})
export class SwiftTransferService {
  constructor(private http: HttpClient) {}

  sendViaSwift(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.swiftTransfer,
      payload
    );
  }

  getTransferCharges(payload: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.transfers.getTransferCharges,
      payload
    );
  }
}
