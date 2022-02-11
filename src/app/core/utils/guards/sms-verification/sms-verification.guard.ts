import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from '../../../services/storage/storage.service';
import LOGIN_CONSTANTS from '../../constants/pre-login.constants';

@Injectable()
export class SmsVerificationGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router, private readonly authService: AuthService) { }
  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const stage = this.authService.getLoginState();
    const accessToken = this.authService.accessToken;
    if (stage === LOGIN_CONSTANTS.LOGIN_STAGES.SMS_VERIFICATION && accessToken) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false
    }
  }

}
