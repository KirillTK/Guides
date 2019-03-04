import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class AuthService {


  private _loggedInStatus: Subject<boolean> = new Subject<boolean>();
  loggedInStatus = this._loggedInStatus.asObservable();
  // private loggedInStatus = false;
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
    this._loggedInStatus.next(value);
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }


}
