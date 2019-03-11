import {Component, OnDestroy, OnInit} from '@angular/core';
import {IsLoggedIn, UserService} from './shared/services/User.service';
import {Router} from '@angular/router';
import {AuthService} from './shared/services/AuthService';
import {Observable, Subscription} from 'rxjs';
import {SettingsService} from './shared/services/Settings.service';
import {TranslateService} from '@ngx-translate/core';
import {AuthState} from './shared/model/AuthState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Exam-Front';
  isAuthenticated = false;
  userID: string;
  isAdmin: boolean;
  isDarkTheme: Observable<boolean>;
  language: Observable<string>;
  authentication: Observable<AuthState>;

  private authenticationSubscription: Subscription;
  private isLoggedInSubscription: Subscription;
  private languageSubscription: Subscription;
  private darkThemeSubscription: Subscription;


  constructor(private userService: UserService,
              private route: Router,
              private auth: AuthService,
              private settings: SettingsService,
              public translate: TranslateService) {
    translate.addLangs(['en', 'rus']);
    translate.setDefaultLang('en');

  }


  ngOnInit(): void {
    this.settings.loadLanguage();
    this.settings.loadTheme();

    this.isDarkTheme = this.settings.isDarkTheme;
    this.darkThemeSubscription = this.isDarkTheme.subscribe(result => this.settings.loadTheme());

    this.language = this.settings.language;
    this.languageSubscription = this.language.subscribe(() => this.settings.loadLanguage());

    this.authentication = this.auth.loggedInStatus;
    this.authenticationSubscription = this.authentication.subscribe((state: AuthState) => {
      if (state.isAuth) {
        this.userID = state.user._id;
        this.isAdmin = state.user.isAdmin;
      }
      this.isAuthenticated = state.isAuth;
    });

    this.isLoggedInSubscription = this.userService.isLoggedIn().subscribe((status: IsLoggedIn) => {
      if (status.status) {
        this.userID = status.user._id;
        this.isAdmin = status.user.isAdmin;
        this.userService.user = status.user;
        this.auth.setLoggedIn({isAuth: status.status, user: status.user});
      } else {
        this.auth.setLoggedIn({isAuth: status.status});
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authenticationSubscription) { this.authenticationSubscription.unsubscribe(); }
    if (this.isLoggedInSubscription) { this.isLoggedInSubscription.unsubscribe(); }
    if (this.languageSubscription) { this.languageSubscription.unsubscribe(); }
    if (this.darkThemeSubscription) { this.darkThemeSubscription.unsubscribe(); }
  }

  logout() {
    this.auth.setLoggedIn({isAuth: false});
    this.userService.logOut().subscribe();
    this.route.navigate(['/']);
  }

}
