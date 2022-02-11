import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import LOGIN_CONSTANTS from '../../constants/pre-login.constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private storageService: StorageService,
    private router: Router,
    private readonly authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const stage = this.authService.getLoginState();
    console.log('login stage', stage)
    if (stage === LOGIN_CONSTANTS.LOGIN_STAGES.LOGIN_SUCCESS) {
      this.router.navigate(['/dashboard']);
      return false
    }
    return true
  }

}
