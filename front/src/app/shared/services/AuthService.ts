import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  private loggedInStatus = false;
  private _token: string;

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  constructor() {
  }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }


}
