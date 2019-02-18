import {AfterViewChecked, Component} from '@angular/core';
import {UserService} from './shared/services/User.service';
import {Router} from '@angular/router';
import {AuthService} from './shared/services/AuthService';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  title = 'Exam-Front';
  public isAuthenticated = false;

  constructor(private userService: UserService, private route: Router, private auth: AuthService) {
  }

  ngAfterViewChecked(): void {
    this.userService.isLoggedIn().subscribe(response => {
      this.auth.setLoggedIn(response.status);
      this.isAuthenticated = response.status;
    });
  }

  logout() {
    this.userService.logOut().subscribe();
    this.route.navigate(['/']);
  }


}
