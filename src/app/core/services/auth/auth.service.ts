import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenResponseModel } from '../../domain/user-auth.model';
import { LogoutService } from '../modal-services/logout.service';
import urlList from '../service-list.json';
import { StorageService } from '../storage/storage.service';
import { LoggedinUserModel, UserModel } from '../../domain/user.model';
import LOGIN_CONSTANTS from '../../utils/constants/pre-login.constants';
import { BaseTransactComponent } from 'src/app/presentation/modules/post-login/transact/base-transact.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface LogoutData {
  username: string;
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseTransactComponent implements OnDestroy {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private otpMesssage = new BehaviorSubject<string>('');
  private activeLogoutTimer: any;
  private logoutWarningTimer: any;
  private autoRefreshTokenTimer: any;
  private logoutWarningTimeMinutes = environment.logoutWarningTimeMinutes;
  private logoutWarningTime = this.logoutWarningTimeMinutes * 60 * 1000; // minutes * seconds * milliseconds
  private logoutForcedTimeMinutes = environment.logoutForcedTimeMinutes;
  private logoutForcedTime = this.logoutForcedTimeMinutes * 60 * 1000; // minutes * seconds * milliseconds
  private watchRouteChange: Subscription;
  loginState = new BehaviorSubject<string | null>(null);

  get IsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private storageService: StorageService,
    private http: HttpClient,
    private readonly logoutService: LogoutService,
    private readonly snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  ngOnDestroy(): void {
    this.clearTimers();
    if (this.watchRouteChange) {
      this.watchRouteChange.unsubscribe();
    }
  }

  public async getUserData(): Promise<UserModel> {
    return await this.storageService.getData('loginCred');
  }


  public verifyToken(data: any) {
    const url = environment.apiUrl + urlList.login.loginUser;
    return this.http
      .post<TokenResponseModel>(url, data);

  }

  public submitOTP(payload: any) {
    return {
      submitOTP: this.http.get<UserModel>(`${environment.apiUrl}${urlList.login.verifyOtp}?reference=ref&otp=${payload}`),
      submitFirstTimeLogin: this.http.post<UserModel>(`${environment.apiUrl}${urlList.login.firstlogin}`, payload),
    }
  }

  public submitForgetPasswordOTP(otp: string, email: string) {
    return {
      forgotPassword: this.http.get<UserModel>(`${environment.apiUrl}${urlList.login.verifyForgetPasswordOtp}?email=${email}&otp=${otp}`),
      forgotUsername: this.http.get<UserModel>(`${environment.apiUrl}${urlList.login.verifyForgotUsernameOtp}?email=${email}&otp=${otp}`)
    }
  }

  resendOTP() {
    const url = environment.apiUrl + urlList.login.resendOtp;
    return this.http
      .get<UserModel>(url);
  }

  userLogin(data: any) {
    const payload = new URLSearchParams();
    payload.set('username', data.username);
    payload.set('password', data.password);
    payload.set('grant_type', data.grant_type);
    payload.set('client_id', data.client_id);
    payload.set('client_secret', data.client_secret);
    payload.set('scope', data.scope);

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const url = environment.apiUrl + urlList.login.loginUser;
    return this.http
      .post<TokenResponseModel>(url, payload, { headers });

  }

  setToken(accessToken: TokenResponseModel): void {
    if (!accessToken?.tokenExpirationDate) {
      accessToken.tokenExpirationDate = new Date(
        new Date().getTime() + accessToken.expires_in * 1000
      ).getTime();
    }
    console.log('access_token', accessToken)
    this.storageService.setData('access_token', accessToken);
    // this.autoRefreshToken(accessToken);
  }

  setOTPMessage(message: string) {
    this.storageService.setData('otp_message', { message })
  }

  getOTPMessage() {
    const value = this.storageService.getData('otp_message');
    return value?.message;
  }

  setLoginState(state: string) {
    this.storageService.setData('login_state', { state });
    this.loginState.next(state)
  }

  async loginSuccess() {
    return new Promise((resolve, reject) => {
      this.getLogonUser().subscribe(response => {
        if (response) {
          this.userState = response;
          this.activateLogin();
          this.router.navigate(['/dashboard']);
          resolve(true);
        } else {
          resolve(false);
        }
      }, error => {
        resolve(false);
      });
    })

  }

  getLogonUser() {
    const url = `${environment.apiUrl}${urlList.login.getLogonUser}userid=${this.accessToken?.username}`;
    return this.http
      .get<LoggedinUserModel>(url);

  }

  getLoginState(): string | null {
    const value = this.storageService.getData('login_state');
    if (value) {
      return value.state;
    }
    return null
  }

  get accessToken(): TokenResponseModel | null {
    if (!this.isTokenActive) {
      return null;
    }
    const token = this.storageService.getData('access_token');
    return token;
  }

  get userState(): LoggedinUserModel {
    return this.storageService.getData('user_data');
  }
  set userState(data: LoggedinUserModel) {
    this.storageService.setData('user_data', data);
  }

  doLogout(): void {
    this.clearTimers();
    // this.logout();
    const lang = this.storageService.getData('currentLanguage');
    this.clearUserData();
    this.storageService.setData('currentLanguage', lang);
    if (this.watchRouteChange) {
      this.clearTimers();
      this.watchRouteChange.unsubscribe();
    }
    if (this.accessToken?.access_token) {
      this.notifyError({
        error: false,
        errorStatus: '',
        message: 'You have been signed out successfully',
      });
      this.router.navigate(['/auth/login']);
    }
  }
  cancelLogin(): void {
    this.clearTimers();
    this.clearUserData();
    this.router.navigate(['/auth/login']);
  }

  activateLogin() {
    if (this.isTokenActive) {
      this.isLoggedIn.next(true);
      this.idleWarning();
    } else {
      this.doLogout();
    }
  }

  get isTokenActive(): boolean {
    try {
      return this.accessToken ? this.accessToken.tokenExpirationDate > new Date().getTime() : false;
    } catch (error) {
      return false
    }
  }

  idleWarning(): void {
    this.watchRouteChange = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((resp) => {
        console.log('idleWarning', resp)
        this.clearIdleWarningTimers();
        this.setIdleTimers();
      });
  }

  setIdleTimers(): void {
    this.logoutWarningTimer = setTimeout(() => {
      this.autoLogoutWarning();
    }, this.logoutWarningTime);

    this.activeLogoutTimer = setTimeout(() => {
      this.logoutService.closeLogoutWarning(true);
    }, this.logoutForcedTime);
  }

  autoLogoutWarning(): void {
    const logoutWarningModal = this.logoutService.openLogoutWarning();
    logoutWarningModal.componentInstance.msTillLogout = this.logoutForcedTime - this.logoutWarningTime;
    logoutWarningModal.afterClosed().subscribe((logoutNow: boolean) => {
      if (logoutNow) {
        this.doLogout();
      } else {
        this.clearIdleWarningTimers();
        this.setIdleTimers();
      }
    });
  }

  private clearIdleWarningTimers(): void {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    if (this.logoutWarningTimer) {
      clearTimeout(this.logoutWarningTimer);
    }
  }

  private clearTimers(): void {
    this.clearIdleWarningTimers();
    if (this.autoRefreshTokenTimer) {
      clearTimeout(this.autoRefreshTokenTimer);
    }
  }

  private logout(): void {
    const url = environment.apiUrl + urlList;
    this.http.get<any>(url);
  }

  clearUserData(): void {
    this.storageService.clearData();
  }

  private completeLogout(): void {

  }
}
