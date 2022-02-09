import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { StorageService } from '../storage/storage.service';
import { environment } from './../../../../environments/environment';
import urlList from '../service-list.json';
import { UserModel } from '../../domain/user.model';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSmsVerificationService {

  user: UserModel;
  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService,
    private readonly loginService: LoginService,
    private readonly router: Router) { }

  public submitOTP(otp: string, user: UserModel) {
    console.log(otp, user);
    const url = environment.apiUrl + urlList.login.verifyOtp;
    user.smsToken = otp;
    return this.http
      .post<UserModel>(url, user);
  }

  resendOTP(user: UserModel) {
    console.log(user);
    const url = environment.apiUrl + urlList.login.resendOtp;
    return this.http
      .post<UserModel>(url, user);
  }


}
