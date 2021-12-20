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
  generateOtp(payload: any):void{
    console.log(payload, 'Generate OTP');
  }
}
