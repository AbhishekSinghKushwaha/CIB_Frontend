import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { UserListService } from '../user-list/services/user-list.service';
import { User } from '../user-list/user-list.component';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(
    private userListService: UserListService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User | never> {
    const userId: string = route.paramMap.get('id') as string;

    return this.userListService.getUserById(+userId).pipe(
      take(1),
      mergeMap((result: User | undefined) => {
        if (result) {
          return of(result);
        }
        this.router.navigate(['/user-management']);
        return EMPTY;
      })
    );
  }
}
