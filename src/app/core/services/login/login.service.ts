import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserModel } from '../../domain/user.model';
import urlList from '../service-list.json';
import { StorageService } from '../storage/storage.service';

interface Userdata {
  username: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  verification_token?: string;
  response_code?: string;
  error_code?: string;
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

  public userLogin(data: Userdata) {
    const url = environment.apiUrl + urlList.login.loginUser;
    return this.http
      .post<UserModel>(url, data);
  }

  private resetTempPassword(verifyToken: string, password: string): void {
    this.storageService.setData('verify_token', verifyToken);
    this.storageService.setData('temp_password', password);
    this.router.navigate(['/access/reset-temporary-password']);
  }


}
