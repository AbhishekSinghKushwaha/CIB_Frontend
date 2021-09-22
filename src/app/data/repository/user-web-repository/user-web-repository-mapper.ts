import { UserModel } from './../../../core/domain/user.model';
import { UserWebEntity } from './user-web-entity';
import { Mapper } from 'src/app/core/base/mapper';

export class UserWebRepositoryMapper extends Mapper<UserWebEntity, UserModel> {
  mapFrom(param: UserWebEntity): UserModel {
    return {
      name: param.name,
      family: param.family,
    };
  }

  mapTo(param: UserModel): UserWebEntity {
    return {
      id: 0,
      name: param.name,
      family: param.family,
    };
  }
}
