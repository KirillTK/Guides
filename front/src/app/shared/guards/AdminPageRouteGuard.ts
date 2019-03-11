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

    return this.user.isLoggedIn().pipe(map(res => {
      if (res.status && (next.params.id === res.user._id && res.user.isAdmin)) {
        this.auth.setLoggedIn({isAuth: res.status, user: res.user});
        this.user.user = res.user;
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }));
  }
}
