import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AuthState} from '../model/AuthState';

@Injectable()
export class AuthService {


  private _loggedInStatus: Subject<AuthState> = new Subject<AuthState>();
  loggedInStatus = this._loggedInStatus.asObservable();

  constructor() {
  }

  setLoggedIn(value: AuthState) {
    this._loggedInStatus.next(value);
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }


}
