import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../services/User.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from '../services/AuthService';

@Injectable()
export class AdminPageRouteGuard implements CanActivate {

  constructor(private user: UserService, private router: Router, private auth: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.auth.isLoggedIn && this.user.user._id === next.params.id && this.user.user.isAdmin) {
      return true;
    }

    return this.user.isLoggedIn(next.params.id).pipe(map(res => {
      if (res.status && res.user.isAdmin) {
        this.auth.setLoggedIn(true);
        this.user.user = res.user;
        this.auth.token = res.token;
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
    }));
  }
}
