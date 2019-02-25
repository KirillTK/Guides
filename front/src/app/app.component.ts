import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {UserService} from './shared/services/User.service';
import {Router} from '@angular/router';
import {AuthService} from './shared/services/AuthService';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ThemeService} from './shared/services/Theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked, OnInit {
  title = 'Exam-Front';
  public isAuthenticated = false;
  public userID: string;
  public isAdmin: boolean;
  isDarkTheme: Observable<boolean>;


  constructor(private userService: UserService, private route: Router, private auth: AuthService, private themeService: ThemeService) {
  }

  ngAfterViewChecked(): void {
    // this.userService.isLoggedIn().subscribe(response => {
    //   this.auth.setLoggedIn(response.status);
    //   if (response.user) {
    //     this.userService.user = response.user;
    //     this.userID = response.user._id;
    //     this.auth.token = response.token;
    //   }
    //   this.isAuthenticated = response.status;
    // });
    if (this.auth.isLoggedIn) {
      this.userID = this.userService.user._id;
      this.isAuthenticated = true;
      this.isAdmin = this.userService.user.isAdmin;
    } else {
      this.isAuthenticated = false;
    }
  }


  ngOnInit(): void {
    this.isDarkTheme = this.themeService.isDarkTheme;
    this.isDarkTheme.subscribe(result => {
      if (result) {
        document.body.classList.add('dark-theme', 'mat-app-background');
      } else {
        document.body.classList.remove('dark-theme');
      }
    });
  }

  logout() {
    this.auth.setLoggedIn(false);
    this.userService.logOut().subscribe();
    this.route.navigate(['/']);
  }

}
