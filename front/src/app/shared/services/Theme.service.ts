import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable()
export class ThemeService {

  constructor(@Inject(BROWSER_STORAGE) public storage: Storage, @Inject(DOCUMENT) private document: Document) {
  }

  private _darkTheme: Subject<boolean> = new Subject<boolean>();
  isDarkTheme = this._darkTheme.asObservable();

  setDarkTheme(isDarkTheme: boolean) {
    this.storage.setItem('theme', JSON.stringify({isDarkTheme}));
    this._darkTheme.next(isDarkTheme);
  }

  public loadTheme() {
    console.log();
    const theme = this.storage.getItem('theme');
    if (theme) {
      const {isDarkTheme} = JSON.parse(theme);
      if (isDarkTheme) {
        // document.body.classList.add('dark-theme', 'mat-app-background');
        this.document.body.classList.add('dark-theme', 'mat-app-background');
      } else {
        // document.body.classList.remove('dark-theme');
        this.document.body.classList.remove('dark-theme');
      }
    }

  }

  returnTheme() {
    const theme = this.storage.getItem('theme');
    if (theme) {
      const {isDarkTheme} = JSON.parse(theme);
      console.log(isDarkTheme);
      return !!isDarkTheme;
    }
    return false;
  }
}
