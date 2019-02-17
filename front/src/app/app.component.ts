import {AfterViewChecked, Component} from '@angular/core';
import {UserService} from './shared/services/User.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  title = 'Exam-Front';
  public isAuthenticated = false;

  constructor(private userService: UserService, private route: Router) {
  }

  ngAfterViewChecked(): void {
    // this.isAuthenticated = this.userService.isAuthenticated();
  }

  logout() {
    this.userService.logOut();
    this.route.navigate(['/']);
  }


}
