import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User, UserStatus } from '../user-list.component';

@Injectable()
export class UserListService {
  private users: User[] = [
    {
      id: 134312,
      name: 'Michael Scott',
      phone: '0712345678',
      email: 'scott@dmi.com',
      status: 'enabled',
    },
    {
      id: 133827,
      name: 'Jim Halpert',
      phone: '0723456789',
      email: 'j.hal@dmi.com',
      status: 'enabled',
    },
    {
      id: 381746,
      name: 'Dwight Schrute',
      phone: '0734567890',
      email: 'd.sch@dmi.com',
      status: 'enabled',
    },
    {
      id: 938273,
      name: 'Andy Benard',
      phone: '0745678901',
      email: 'a.ben@dmi.com',
      status: 'disabled',
    },
    {
      id: 291847,
      name: 'Phyllis Vance',
      phone: '0756789012',
      email: 'p.van@dmi.com',
      status: 'disabled',
    },
  ];

  getUserList(): User[] {
    return [...this.users];
  }

  getUserById(id: number): Observable<User | undefined> {
    const result: User | undefined = this.users.find(
      (user: User) => user.id === id
    );
    return of(result);
  }

  setUserStatus(id: number, status: UserStatus): Observable<User | undefined> {
    return this.getUserById(id).pipe(
      switchMap((result: User | undefined) => {
        if (result) {
          result.status = status;
        }
        return of(result);
      })
    );
  }
}
