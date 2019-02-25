import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/User';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getListUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/admin/getListUsers');
  }

  deleteUser(uid: string): Observable<User[]> {
    return this.http.delete<User[]>(`/api/admin/deleteUser/${uid}`);
  }

  changeRole(user: User): Observable<User[]> {
    return this.http.put<User[]>('/api/admin/updateRole', user);
  }

  blockUser(user: User): Observable<User[]> {
    return this.http.put<User[]>('/api/admin/blockUser', user);
  }


}
