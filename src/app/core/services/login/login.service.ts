import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenResponseModel } from '../../domain/user-auth.model';
import { UserModel } from '../../domain/user.model';
import urlList from '../service-list.json';
import { StorageService } from '../storage/storage.service';

interface Userdata {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private readonly storageService: StorageService,
    private router: Router
  ) { }


  public async getUserData(): Promise<UserModel> {
    return await this.storageService.getData('loginCred');
  }

  public userLogin(data: any) {
    const tokenData = this.storageService.getData('tokenState');

    const payload = new URLSearchParams();
    payload.append('username', data.username);
    payload.append('password', data.password);
    payload.append('grant_type', 'password');
    payload.append('client_id', 'onboarding');
    payload.append('client_secret', 'postman-secret');
    payload.append('scope', 'offline_access');

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const url = environment.apiUrl + urlList.login.loginUser;
    return this.http
      .post<TokenResponseModel>(url, data, { headers });
  }

  private resetTempPassword(verifyToken: string, password: string): void {
    this.storageService.setData('verify_token', verifyToken);
    this.storageService.setData('temp_password', password);
    this.router.navigate(['/access/reset-temporary-password']);
  }


}
