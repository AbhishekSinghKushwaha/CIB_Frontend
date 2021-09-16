import { UserWebEntity } from './user-web-entity';
import { UserModel } from './../../../core/domain/user.model';
import { UserRepository } from 'src/app/core/repositories/user.repository';
import { UserMockRepositoryMapper } from './../user-mock-repository/user-mock-repository-mapper';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserWebRepository extends UserRepository {
  mapper = new UserMockRepositoryMapper();

  constructor(private http: HttpClient) {
    super();
  }

  getUserById(id: number): Observable<UserModel> {
    return this.http
      .get<UserWebEntity>(
        'http://5b8d40db7366ab0014a29bfa.mockapi.io/api/v1/users/${id}'
      )
      .pipe(map(this.mapper.mapFrom));
  }

  getAllUsers(): Observable<UserModel> {
    return this.http
      .get<UserWebEntity[]>(
        'http://5b8d40db7366ab0014a29bfa.mockapi.io/api/v1/users'
      )
      .pipe(mergeMap((item) => item))
      .pipe(map(this.mapper.mapFrom));
  }
}
