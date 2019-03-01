import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {Observable} from 'rxjs';
import {UserProfile} from '../../pages/user-profile/user-profile.component';

interface IsLoggedIn {
  status: boolean;
  user: User;
  token?: string;
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
    console.log('service', user);
    return this.http.post('/api/registration', user);
  }

  loginUser(user: User) {
    return this.http.post('/api/login', user);
  }

  isLoggedIn(id: string): Observable<IsLoggedIn> {
    return this.http.get<IsLoggedIn>(`/api/isLoggedin/${id}`);
  }

  logOut() {
    return this.http.get('/api/logout');
  }

  getUserById(id: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(`/api/getUserInfo/${id}`);
  }


}
