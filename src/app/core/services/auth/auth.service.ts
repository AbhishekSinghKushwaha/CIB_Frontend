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
import { UserModel } from '../../domain/user.model';

interface LogoutData {
  username: string;
  token: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private activeLogoutTimer: any;
  private logoutWarningTimer: any;
  private autoRefreshTokenTimer: any;
  private logoutWarningTimeMinutes = 4;
  private logoutWarningTime = this.logoutWarningTimeMinutes * 60 * 1000; // minutes * seconds * milliseconds
  private logoutForcedTimeMinutes = 5;
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
    private readonly logoutService: LogoutService
  ) { }

  ngOnDestroy(): void {
    this.clearTimers();
    if (this.watchRouteChange) {
      this.watchRouteChange.unsubscribe();
    }
  }

  public async getUserData(): Promise<UserModel> {
    return await this.storageService.getData('loginCred');
  }

  public userLogin(data: any) {
    const tokenData = this.storageService.getData('tokenState');
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


  public verifyToken(data: any) {
    const url = environment.apiUrl + urlList.login.loginUser;
    return this.http
      .post<TokenResponseModel>(url, data);

  }

  public submitOTP(otp: string) {
    const url = `${environment.apiUrl}${urlList.login.verifyOtp}?reference=ref&otp=${otp}`;
    return this.http
      .get<UserModel>(url);
  }

  resendOTP() {
    const url = environment.apiUrl + urlList.login.resendOtp;
    return this.http
      .get<UserModel>(url);
  }


  loginUser(authToken: TokenResponseModel): void {
    this.clearUserData();
    this.setToken(authToken);
    this.isLoggedIn.next(true);
    this.idleWarning();
  }

  setToken(accessToken: TokenResponseModel): void {
    if (!accessToken?.tokenExpirationDate) {
      accessToken.tokenExpirationDate = new Date(
        new Date().getTime() + accessToken.expires_in * 1000
      );
    }
    this.storageService.setData('access_token', accessToken);
    // this.autoRefreshToken(accessToken);
  }

  setLoginState(state: string) {
    this.storageService.setData('login_state', { state });
    this.loginState.next(state)
  }

  getLoginState(): string | null {
    const value = this.storageService.getData('login_state');
    if (value) {
      return value.state;
    }
    return null
  }

  get accessToken(): TokenResponseModel | null {
    const token = this.storageService.getData('access_token');

    // const currentTime = new Date().getTime();
    // const expired = this.accessToken && new Date(this.accessToken?.tokenExpirationDate).getTime() > currentTime;
    // console.log('expired', expired)
    // if (expired) {
    //   return null;
    // }

    return token;
  }

  doLogout(): void {
    this.clearTimers();
    this.logout();
    this.completeLogout();
  }

  autoLogin(): boolean {
    const currentTime = new Date().getTime();
    if (this.accessToken && new Date(this.accessToken?.tokenExpirationDate).getTime() > currentTime) {
      this.loginUser(this.accessToken);
      return true;
    } else {
      this.isLoggedIn.next(false);
      return false;
    }
  }

  idleWarning(): void {
    this.watchRouteChange = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isLoggedIn.subscribe((resp) => {
          if (resp === true) {
            this.clearIdleWarningTimers();
            this.setIdleTimers();
          } else {
            this.clearTimers();
            this.watchRouteChange.unsubscribe();
          }
        });
      });
  }

  setIdleTimers(): void {
    this.logoutWarningTimer = setTimeout(() => {
      // this.autoLogoutWarning();
    }, this.logoutWarningTime);

    this.activeLogoutTimer = setTimeout(() => {
      this.logoutService.closeLogoutWarning()
      this.doLogout();
    }, this.logoutForcedTime);
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

  private clearUserData(): void {
    this.storageService.clearData();
  }

  private completeLogout(): void {
    this.clearUserData();
    this.storageService.clearData();
    this.isLoggedIn.next(false);
    if (this.watchRouteChange) {
      this.watchRouteChange.unsubscribe();
    }
    window.location.reload();
  }
}
