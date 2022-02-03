import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import urlList from '../../services/service-list.json';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { BaseTransactComponent } from 'src/app/presentation/modules/post-login/transact/base-transact.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorIntercept
  extends BaseTransactComponent
  implements HttpInterceptor
{
  disabledRoutes: string[] = [
    environment.apiUrl + urlList.accounts.getUserAccounts,
    environment.apiUrl + urlList.dataLookUp.getBanks,
    environment.apiUrl + urlList.dataLookUp.getSubsidiaries,
  ];
  constructor(
    private spinnerService: SpinnerService,
    private snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.setLoading(true, request.url);
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.spinnerService.setLoading(false, request.url);
          if (request.method === 'POST' && event?.body?.isSuccessful) {
            this.notifyError({
              error: false,
              errorStatus: event.statusText,
              message: event?.body?.Message || event?.body?.message,
            });
          }
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        this.spinnerService.setLoading(false, request.url);
        const errorMessage = {
          error: false,
          errorStatus: '',
          message: '',
          details: '',
        };
        if (error.error instanceof ErrorEvent) {
          errorMessage.error = true;
          errorMessage.message = error.error.message;
          this.notifyError(errorMessage);
        } else {
          errorMessage.error = true;
          errorMessage.errorStatus = `${error.status}`;
          errorMessage.message = error.error.message;
          errorMessage.details = error.error;
          this.notifyError(errorMessage);
        }
        // TODO:: Add loggin service here
        return throwError(errorMessage);
      })
    );
  }
}
