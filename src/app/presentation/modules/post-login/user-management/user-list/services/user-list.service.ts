import { Injectable } from '@angular/core';
import { User } from '../user-list.component';

@Injectable()
export class UserListService {
  getUserList(): User[] {
    const users: User[] = [
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
    return users;
  }
}
