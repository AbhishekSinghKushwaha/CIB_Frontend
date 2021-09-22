import { UserMockEntity } from './user-mock-entity';
import { UserModel } from './../../../core/domain/user.model';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserRepository } from 'src/app/core/repositories/user.repository';
import { UserMockRepositoryMapper } from './user-mock-repository-mapper';

@Injectable({
  providedIn: 'root'
})
export class UserMockRepository extends UserRepository {

  private mapper = new UserMockRepositoryMapper();

  users = [
    {
      'id': 1,
      'name': 'Mr. MockBig',
      'family': 'father'
    },
    {
      'id': 2,
      'name': 'Mrs. MockTootoot',
      'family': 'mother'
    },
    {
      'id': 3,
      'name': 'LittleMockToot',
      'family': 'baby'
    }
  ];

  constructor() {
    super();
  }

  getUserById(id: number): Observable<UserModel> {
    return from(this.users)
      .pipe(filter((user: UserMockEntity) => user.id === id))
      .pipe(map(this.mapper.mapFrom));

  }

  getAllUsers(): Observable<UserModel> {
    return from(this.users)
      .pipe(map(this.mapper.mapFrom));
  }
}
