import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UseCase } from './../base/use-case';

@Injectable({
  providedIn: 'root',
})
export class ValidateCredentialsUsecase implements UseCase<string, boolean> {
  constructor() {}

  execute(params: string): Observable<boolean> {
    return of(true);
  }
}
