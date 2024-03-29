import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import LOGIN_CONSTANTS from '../../constants/pre-login.constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class PreLoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private readonly authService: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isTokenActive = this.authService.isTokenActive;
    console.log('isTokenActive', isTokenActive)
    if (!isTokenActive) {
      return true;
    }
    this.router.navigate(['/dashboard']);
    return false
  }

}
