import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import LOGIN_CONSTANTS from '../../constants/pre-login.constants';

@Injectable()
export class SecurityVerificationGuard implements CanActivate {
  constructor(private router: Router, private readonly authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const stage = this.authService.getLoginState();
    const accessToken = this.authService.accessToken;
    if (stage === LOGIN_CONSTANTS.LOGIN_STAGES.SECURITY_VERIFICATION && accessToken) {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false
    }
  }
}
