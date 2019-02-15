import {CanActivate} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../services/User.service';

@Injectable()
export class UserPageRouteGuard implements CanActivate {

  constructor(private userService: UserService) {
  }

  canActivate() {
    return !!this.userService.user;
  }
}
