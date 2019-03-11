import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {Observable} from 'rxjs';
import {UserProfile} from '../../pages/user-profile/user-profile.component';
import {LoginResponse} from '../model/LoginResponse';

export interface IsLoggedIn {
  status: boolean;
  user: User;
}

@Injectable()
export class UserService {

  private _user: User;


  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  constructor(private http: HttpClient) {
  }

  registerUser(user: User) {
    return this.http.post('/api/registration', user);
  }

  loginUser(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', user);
  }

  isLoggedIn(): Observable<IsLoggedIn> {
    return this.http.get<IsLoggedIn>('/api/isLoggedin');
  }

  logOut() {
    return this.http.get('/api/logout');
  }

  getUserById(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`/api/getUserInfo/${id}`);
  }


}
