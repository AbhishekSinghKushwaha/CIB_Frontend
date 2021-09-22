import { UserModel } from './../domain/user.model';
import { Observable } from "rxjs";

export abstract class UserRepository {
  abstract getUserById(id:number): Observable<UserModel>;
  abstract getAllUsers(): Observable<UserModel>;
}
