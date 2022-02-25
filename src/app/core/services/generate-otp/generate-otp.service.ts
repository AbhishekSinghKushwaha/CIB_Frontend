import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BankModel } from '../../domain/bank.model';
import urlList from '../service-list.json';


@Injectable({
  providedIn: 'root'
})
export class GenerateOtpService {

  constructor(private http: HttpClient) { }

  // Generate OTP
  generateOtp(payload: any): Observable<any> {
    console.log(payload, "Generate payload");
    return this.http.post(environment.apiUrl + urlList.otp.generateOtp, payload);
  }

  // Regenerate OTP
  regenerateOtp(payload: any): Observable<any> {
    console.log(payload, "Regenerate payload");
    return this.http.post(environment.apiUrl + urlList.otp.regenerateOtp, payload);
  }
}
