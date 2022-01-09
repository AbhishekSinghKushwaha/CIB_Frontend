import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../../services/storage/storage.service';
import LOGIN_CONSTANTS from '../../constants/pre-login.constants';

@Injectable()
export class SmsVerificationGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const data = this.storageService.getData('loginState');
    const loginDataSet = !!this.storageService.getData('loginCred');
    if (data?.stage === LOGIN_CONSTANTS.LOGIN_STAGES.SMS_VERIFICATION && loginDataSet) {
      return true
    }
    return false
  }

}
