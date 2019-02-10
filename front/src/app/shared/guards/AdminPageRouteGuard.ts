import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AdminPageRouteGuard implements CanActivate {

  constructor() {
  }

  canActivate() {
    return true;
  }
}
