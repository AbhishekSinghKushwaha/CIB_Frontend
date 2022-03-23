import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import urlList from '../../../../../core/services/service-list.json';

@Injectable()
export class UserAdministrationService {
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.userAdministration.getUsers,
      {}
    );
  }

  reviewStatus(userId: string, action: number, metadata = {}): Observable<any> {
    const payload = {
      action, userId, metadata
    }
    return this.http.post(
      environment.apiUrl + urlList.userAdministration.changeStatus,
      payload
    );
  }

  enableUser(userId: string): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.userAdministration.changeStatus,
      { isEnable: true, userId }
    );
  }

  disableUser(userId: string, disableReason: string): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.userAdministration.changeStatus,
      { isEnable: false, disableReason, userId }
    );
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.post(
      environment.apiUrl + urlList.userAdministration.delete,
      { userId }
    );
  }

  getUserById(userId: string): Observable<any> {
    return this.http.get(
      environment.apiUrl + urlList.userAdministration.getUserById,
      {
        params: { userid: userId },
      }
    );
  }
}
