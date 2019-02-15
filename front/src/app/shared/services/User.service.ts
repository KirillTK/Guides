import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';


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
    return this.http.post('http://localhost:3000/api/registration', user);
  }

  loginUser(user: User) {
    return this.http.post('http://localhost:3000/api/login', user);
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  logOut(): void {
    this.user = null;
  }


}
