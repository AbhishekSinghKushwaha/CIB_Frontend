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

@Injectable({ providedIn: 'root' })
export class PostLoginGuard implements CanActivate {
  constructor(
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
    const isTokenActive = this.authService.isTokenActive;
    if (!isTokenActive) {
      this.router.navigate(['/auth/login']);
      return false
    }
    return true
  }
}
