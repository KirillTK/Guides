import {Component, OnInit} from '@angular/core';
import {IsLoggedIn, UserService} from './shared/services/User.service';
import {Router} from '@angular/router';
import {AuthService} from './shared/services/AuthService';
import {Observable} from 'rxjs';
import {SettingsService} from './shared/services/Settings.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Exam-Front';
  public isAuthenticated = false;
  public userID: string;
  public isAdmin: boolean;
  isDarkTheme: Observable<boolean>;
  language: Observable<string>;
  authentication: Observable<boolean>;


  constructor(private userService: UserService,
              private route: Router,
              private auth: AuthService,
              private settings: SettingsService,
              public translate: TranslateService) {
    translate.addLangs(['en', 'rus']);
    translate.setDefaultLang('en');

    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|rus/) ? browserLang : 'rus');

  }


  ngOnInit(): void {
    this.settings.loadLanguage();
    this.settings.loadTheme();

    this.isDarkTheme = this.settings.isDarkTheme;
    this.isDarkTheme.subscribe(result => this.settings.loadTheme());

    this.language = this.settings.language;
    this.language.subscribe(() => this.settings.loadLanguage());

    this.authentication = this.auth.loggedInStatus;
    this.authentication.subscribe(isAuth => this.isAuthenticated = isAuth);

    this.userService.isLoggedIn().subscribe((status: IsLoggedIn) => {
      if (status.status) {
        this.userID = status.user._id;
        this.isAdmin = status.user.isAdmin;
        this.userService.user = status.user;
      }
      this.auth.setLoggedIn(status.status);
    });
  }

  logout() {
    this.auth.setLoggedIn(false);
    this.userService.logOut().subscribe();
    this.route.navigate(['/']);
  }

}
