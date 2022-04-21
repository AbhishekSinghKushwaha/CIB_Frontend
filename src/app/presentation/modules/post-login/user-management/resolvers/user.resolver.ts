import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { UserAdministrationService } from '../services/user-administration.service';
import { User, UserStatus } from '../user-list/user-list.component';

@Injectable()
export class UserResolver implements Resolve<User> {
  constructor(
    private userAdministrationService: UserAdministrationService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User | never> {
    const userId: string = route.paramMap.get('id') as string;

    return this.userAdministrationService.getUserById(userId).pipe(
      take(1),
      mergeMap((result: any | undefined) => {
        if (result) {
          const user = {
            id: result.userId,
            name: `${result.firstName} ${result.lastName}`,
            phone: result.phoneNumber,
            email: result.email,
            userName: result.userName,
            status: (result.status ? 'enabled' : 'disabled') as UserStatus,
          };
          return of(user);
        }
        this.router.navigate(['/user-management']);
        return EMPTY;
      })
    );
  }
}
