import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {Observable} from 'rxjs';

interface IsLoggedIn {
  status: boolean;
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

  isLoggedIn(): Observable<IsLoggedIn> {
    return this.http.get<IsLoggedIn>('/api/isLoggedin');
  }

  logOut() {
    return this.http.get('/api/logout');
  }


}
