import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from './../domain/user.model';
import { UseCase } from './../base/use-case';
import { UserRepository } from '../repositories/user.repository';

@Injectable({
  providedIn: 'root',
})
export class GetUserByIdUsecase implements UseCase<number, UserModel> {
  constructor(private userRepository: UserRepository) {}

  execute(params: number): Observable<UserModel> {
    return this.userRepository.getUserById(params);
  }
}
