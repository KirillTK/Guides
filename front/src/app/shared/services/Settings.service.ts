import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable()
export class SettingsService {

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage,
              @Inject(DOCUMENT) private document: Document,
              private translate: TranslateService) {
  }

  private _darkTheme: Subject<boolean> = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  private _language: Subject<string> = new Subject<string>();
  language = this._language.asObservable();

  setDarkTheme(isDarkTheme: boolean) {
    this.storage.setItem('theme', JSON.stringify({isDarkTheme}));
    this._darkTheme.next(isDarkTheme);
  }

  setLanguage(language: string) {
    this.storage.setItem('language', JSON.stringify({language}));
    this._language.next(language);
  }

  loadLanguage() {
    const languageObj = this.storage.getItem('language');
    const browserLang = this.translate.getBrowserLang();
    if (languageObj) {
      const {language} = JSON.parse(languageObj);
      if (language) {
        this.translate.use(browserLang.match(/en|rus/) ? browserLang : language);
      }
    } else {
      this.translate.use(browserLang.match(/en|rus/) ? browserLang : 'en');
    }
  }

  loadTheme() {
    const theme = this.storage.getItem('theme');
    if (theme) {
      const {isDarkTheme} = JSON.parse(theme);
      if (isDarkTheme) {
        this.document.body.classList.add('dark-theme', 'mat-app-background');
      } else {
        this.document.body.classList.remove('dark-theme');
      }
    }

  }

  returnTheme(): boolean {
    const theme = this.storage.getItem('theme');
    if (theme) {
      const {isDarkTheme} = JSON.parse(theme);
      return !!isDarkTheme;
    }
    return false;
  }

  returnLanguage(): string {
    const _language = this.storage.getItem('language');
    if (_language) {
      const {language} = JSON.parse(_language);
      return language;
    }
    return 'en';
  }

  getTranslationForPaginator(): string {
    const {language} = JSON.parse(this.storage.getItem('language'));
    if (language === 'rus') {
      return 'Элементов на странице:';
    }
    return 'Items per page:';
  }
}
