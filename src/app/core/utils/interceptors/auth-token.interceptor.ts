import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { LanguageService } from './../../services/language/language.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private readonly languageService: LanguageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const authToken = this.authService.accessToken;
    const clientId = environment.clientId;
    console.log('intercept', authToken)
    if (this.authService.isTokenActive && authToken) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${authToken.access_token}`
        ),
      });
    } else if (authToken && !this.authService.isTokenActive) {
      this.authService.doLogout()
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    if (!request.headers.has('Accept')) {
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json'),
      });
    }
    if (!request.headers.has('Accept-Language')) {
      request = request.clone({
        headers: request.headers.set('Accept-Language', this.languageService.defaultLanguage.langCode),
      });
    }

    if (!request.headers.has('clientId')) {
      request = request.clone({
        headers: request.headers.set('clientId', clientId),
      });
    }

    if (!request.headers.has('X-Frame-Options')) {
      request = request.clone({
        headers: request.headers.set('X-Frame-Options', 'SAMEORIGIN'),
      });
    }

    if (!request.headers.has('Content-Security-Policy')) {
      request = request.clone({
        headers: request.headers.set('Content-Security-Policy', "frame-ancestors 'self'"),
      });
    }

    if (!request.headers.has('X-Content-Type-Options')) {
      request = request.clone({
        headers: request.headers.set('X-Content-Type-Options', 'nosniff'),
      });
    }

    if (!request.headers.has('Cache-Control') || !request.headers.has('Pragma')) {
      request = request.clone({
        headers: request.headers
          .set('Cache-Control', 'no-cache, no-store, must-revalidate')
          .set('Pragma', 'no-cache'),
      });
    }

    return next.handle(request);
  }
}
