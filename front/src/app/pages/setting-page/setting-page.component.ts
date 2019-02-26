import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../shared/services/Settings.service';
import {LANGUAGES} from '../../shared/model/Languages';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss']
})
export class SettingPageComponent implements OnInit {

  languages = LANGUAGES;

  isDarkTheme: boolean;
  language: string;


  constructor(private settings: SettingsService) {
  }

  ngOnInit() {
    this.isDarkTheme = this.settings.returnTheme();
    this.language = this.settings.returnLanguage();
  }

  toggleDarkTheme(checked: boolean) {
    this.settings.setDarkTheme(checked);
  }

  changeClient(lang: string) {
    this.settings.setLanguage(lang);
  }


}
