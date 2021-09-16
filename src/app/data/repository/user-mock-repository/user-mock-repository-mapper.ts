import { UserMockEntity } from './user-mock-entity';
import { UserModel } from './../../../core/domain/user.model';
import { Mapper } from 'src/app/core/base/mapper';

export class UserMockRepositoryMapper extends Mapper<UserMockEntity, UserModel> {
  mapFrom(param: UserMockEntity): UserModel {
    return {
      name: param.name,
      family: param.family,
    };
  }

  mapTo(param: UserModel): UserMockEntity {
    return {
      id: 0,
      name: param.name,
      family: param.family
    };
  }
}
