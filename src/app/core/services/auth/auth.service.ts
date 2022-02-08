import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenResponseModel } from '../../domain/user-auth.model';
import { DeviceManagementService } from '../deviceManagement/device-management.service';
import { LogoutService } from '../modal-services/logout.service';
import urlList from '../service-list.json';
import { StorageService } from '../storage/storage.service';

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

  get IsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private storageService: StorageService,
    private http: HttpClient,
    private dmService: DeviceManagementService,
    private readonly logoutService: LogoutService
  ) { }

  ngOnDestroy(): void {
    this.clearTimers();
    if (this.watchRouteChange) {
      this.watchRouteChange.unsubscribe();
    }
  }

  loginUser(authToken: TokenResponseModel): void {
    this.clearUserData();
    this.setToken(authToken);
    this.isLoggedIn.next(true);
    this.idleWarning();
  }

  setToken(authToken: TokenResponseModel): void {
    const accessToken = authToken;
    if (!accessToken.tokenExpirationDate) {
      accessToken.tokenExpirationDate = new Date(
        new Date().getTime() + accessToken.expires_in * 1000
      );
    }
    this.storageService.setData('access_token', accessToken);
    this.autoRefreshToken();
  }

  getToken(): any {
    return this.storageService.getData('access_token');
  }

  doLogout(): void {
    this.clearTimers();
    this.logout();
    this.completeLogout();
  }

  autoLogin(): boolean {
    const currentTime = new Date().getTime();
    const accessToken = this.getToken();
    if (accessToken && new Date(accessToken.tokenExpirationDate).getTime() > currentTime) {
      this.loginUser(accessToken);
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
      this.autoLogoutWarning();
    }, this.logoutWarningTime);

    this.activeLogoutTimer = setTimeout(() => {
      this.logoutService.closeLogoutWarning()
      this.doLogout();
    }, this.logoutForcedTime);
  }
  autoLogoutWarning(): void {
    this.logoutService.openLogoutWarning().componentInstance.msTillLogout =
      this.logoutForcedTime - this.logoutWarningTime;
    // this.logoutWarningModal.componentInstance.userResponse.subscribe((logoutNow: boolean) => {
    //   if (logoutNow) {
    //     this.doLogout();
    //   } else {
    //     this.clearIdleWarningTimers();
    //     this.setIdleTimers();
    //   }
    // });
  }

  refreshAccessToken(): Observable<any> {
    return this.dmService.fetchServerTimestamp().pipe(
      switchMap((timestamp) => {
        const url = environment.apiUrl + 'urlList.deviceManagement.refreshToken';
        const accessToken = this.getToken();
        const timeNow = timestamp;
        const deviceToken = this.dmService.generateDeviceToken(timeNow);

        const payload = new URLSearchParams();
        payload.set('refresh_token', accessToken.refresh_token);
        payload.set('access_token', accessToken.access_token);
        payload.set('client_id', environment.clientId);
        payload.set('grant_type', 'refresh_token');
        payload.set('device_token', deviceToken);
        // payload.set('unix_timestamp', timeNow.toString());

        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        return this.http.post<any>(url, payload.toString(), { headers }).pipe(
          take(1),
          map((token) => {
            const newAccessToken = token;
            newAccessToken.refresh_token = accessToken.refresh_token; // eslint-disable-line
            this.setToken(newAccessToken);
          })
        );
      })
    );
  }

  private autoRefreshToken(): void {
    if (this.autoRefreshTokenTimer) {
      clearTimeout(this.autoRefreshTokenTimer);
    }
    const currentTime = new Date().getTime();
    const accessToken = this.getToken();
    const expireDateTime = new Date(accessToken.tokenExpirationDate).getTime();
    const tokenTimeLeft = Math.floor((expireDateTime - currentTime) * 0.8);
    this.autoRefreshTokenTimer = setTimeout(() => {
      this.refreshAccessToken().pipe(take(1)).subscribe();
    }, tokenTimeLeft);
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
