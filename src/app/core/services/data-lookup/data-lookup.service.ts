import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BankModel } from '../../domain/bank.model';
import urlList from '../service-list.json';

@Injectable({
  providedIn: 'root',
})
export class DataLookupService {
  constructor(private http: HttpClient) {}

  // Get Banks in a particular country
  getBanks(country: string): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.dataLookUp.getBanks + country
    );
  }
}
