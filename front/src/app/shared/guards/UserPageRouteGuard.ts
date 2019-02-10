import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class UserPageRouteGuard implements CanActivate {

  constructor() {
  }

  canActivate() {
    return true;
  }
}
