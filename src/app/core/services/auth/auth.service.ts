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
  private otpMesssage = new BehaviorSubject<string>('');
  private activeLogoutTimer: any;
  private logoutWarningTimer: any;
  private autoRefreshTokenTimer: any;
  private watchRouteChange: Subscription;
  private msBeforeForcedLogout = environment.minutesBeforeForcedLogout * 60 * 1000;
  // get IsLoggedIn(): Observable<boolean> {
  //   return this.isLoggedIn.asObservable();
  // }

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

  userLogin(data: any, refresh = false) {
    const payload = new URLSearchParams();
    if (!refresh) {
      payload.set('username', data.username);
      payload.set('password', data.password);
    } else {
      payload.set('refresh_token', data.refresh_token);
    }
    payload.set('grant_type', data.grant_type);
    payload.set('client_id', data.client_id);
    payload.set('client_secret', data.client_secret);
    payload.set('scope', data.scope);

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const url = environment.apiUrl + urlList.login.loginUser;
    return this.http
      .post<TokenResponseModel>(url, payload, { headers });

  }

  userSwitch(data: any) {
    const payload = new URLSearchParams();
    payload.set('grant_type', data.grant_type);
    payload.set('client_id', data.client_id);
    payload.set('client_secret', data.client_secret);
    payload.set('scope', data.scope);
    payload.set('corporateId', data.corporateId)

    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const url = environment.apiUrl + urlList.login.loginUser;
    return this.http
      .post<TokenResponseModel>(url, payload, { headers });

  }

  setToken(accessToken: TokenResponseModel): void {
    accessToken.tokenExpirationDate = new Date(
      new Date().getTime() + accessToken.expires_in * 1000
    ).getTime();
    this.storageService.setData('access_token', accessToken);
    this.idleWarning();
  }

  setOTPMessage(message: string) {
    this.storageService.setData('otp_message', { message })
  }

  getOTPMessage() {
    const value = this.storageService.getData('otp_message');
    return value?.message;
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

  getGroupedCorporate(corporateId: string) {
    const url = environment.apiUrl + urlList.userManagement.getGroupedCorporate + `/${corporateId}`;
    return this.http
      .get(url);

  }

  getLogonUser() {
    const url = `${environment.apiUrl}${urlList.login.getLogonUser}userid=${this.accessToken?.username}`;
    return this.http
      .get<LoggedinUserModel>(url);
  }

  get accessToken(): TokenResponseModel {
    const token = this.storageService.getData('access_token');
    return token;
  }

  get userState(): LoggedinUserModel {
    return this.storageService.getData('user_data');
  }
  set userState(data: LoggedinUserModel) {
    this.storageService.setData('user_data', data);
  }

  doLogout(from: string): void {
    this.clearTimers();
    this.dismissNotify();
    // this.logout();
    const lang = this.storageService.getData('currentLanguage');
    if (this.watchRouteChange) {
      this.clearTimers();
      this.watchRouteChange.unsubscribe();
    }
    if (this.accessToken?.access_token && from !== 'AuthTokenInterceptor') {
      this.notifyError({
        error: false,
        errorStatus: '',
        message: 'You have been signed out successfully',
      });
    }
    this.clearUserData();

    this.router.navigate(['/auth/login']);
    this.storageService.setData('currentLanguage', lang);
  }

  cancelLogin(): void {
    this.clearTimers();
    this.clearUserData();
    this.router.navigate(['/auth/login']);
  }

  activateLogin() {
    if (this.isTokenActive) {
      this.idleWarning();
    }
  }

  get isTokenActive(): boolean {
    try {
      return this.accessToken ? (this.accessToken?.tokenExpirationDate || 0) > new Date().getTime() : false;
    } catch (error) {
      return false
    }
  }

  idleWarning(): void {
    // if (!this.watchRouteChange) {
    this.watchRouteChange = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((resp) => {
        this.clearIdleWarningTimers();
        this.setIdleTimers();
        !this.isTokenActive && this.doLogout('idleWarning');
      });
    // }
  }

  setIdleTimers(): void {

    this.logoutWarningTimer = setTimeout(() => {
      this.autoLogoutWarning();
    }, this.msTillLogout - this.msBeforeForcedLogout);

    // Force logout
    this.activeLogoutTimer = setTimeout(() => {
      this.logoutService.closeLogoutWarning(true);
    }, this.msTillLogout);
  }

  get msTillLogout(): number {
    return this.accessToken ? this.accessToken?.tokenExpirationDate - new Date().getTime() : 0;
  }

  autoLogoutWarning(): void {
    const logoutWarningModal = this.logoutService.openLogoutWarning();
    logoutWarningModal.componentInstance.msTillLogout = this.msTillLogout;
    logoutWarningModal.afterClosed().subscribe((logoutNow: boolean) => {
      if (logoutNow) {
        this.doLogout('autoLogoutWarning');
      } else {
        const payload = {
          grant_type: 'refresh_token',
          client_id: 'onboarding',
          client_secret: 'postman-secret',
          scope: 'offline_access',
          refresh_token: this.accessToken.refresh_token
        };
        this.userLogin(payload, true).subscribe(
          (authData: TokenResponseModel) => {
            authData?.access_token &&
              this.setToken({ ...this.accessToken, ...authData });
            this.activateLogin();
            this.clearIdleWarningTimers();
            this.setIdleTimers();
          },
          (error) => {
          }
        );

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
