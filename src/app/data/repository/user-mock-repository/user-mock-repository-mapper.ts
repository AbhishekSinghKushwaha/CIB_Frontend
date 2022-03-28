import { UserMockEntity } from './user-mock-entity';
import { UserModel } from './../../../core/domain/user.model';
import { Mapper } from 'src/app/core/base/mapper';

export class UserMockRepositoryMapper extends Mapper<UserMockEntity, UserModel> {
  mapFrom(param: UserMockEntity): UserModel {
    return {
      id: param.id,
      name: param.name,
      family: param.family,
      access_token: param.access_token,
      newLogin: param.newLogin,
      password: param.password,
      transactionType: param.transactionType,
      response_code: param.response_code,
      smsToken: param.smsToken,
      username: param.username,
    }
  };
  mapTo(param: UserModel): UserMockEntity {
    return {
      id: param.id,
      name: param.name,
      family: param.family,
      access_token: param.access_token,
      newLogin: param.newLogin,
      password: param.password,
      transactionType: param.transactionType,
      response_code: param.response_code,
      smsToken: param.smsToken,
      username: param.username,
    };
  }
}
