import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import LOGIN_CONSTANTS from '../../constants/pre-login.constants';

@Injectable()
export class PostLoginGuard implements CanActivate {
  constructor(private storageService: StorageService,
    private readonly authService: AuthService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const stage = this.authService.getLoginState();
    if (
      stage === LOGIN_CONSTANTS.LOGIN_STAGES.LOGIN_SUCCESS
    ) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
