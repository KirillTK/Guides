import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../services/User.service';
import {map} from 'rxjs/operators';
import {AuthService} from '../services/AuthService';
import {Observable} from 'rxjs';

@Injectable()
export class UserPageRouteGuard implements CanActivate {

  constructor(private user: UserService, private router: Router, private auth: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    return this.auth.isLoggedIn;
  }
}
