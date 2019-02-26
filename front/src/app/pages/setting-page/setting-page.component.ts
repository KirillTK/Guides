import {Component, OnInit} from '@angular/core';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ThemeService} from '../../shared/services/Theme.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss']
})
export class SettingPageComponent implements OnInit {

  isDarkTheme: boolean;

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.returnTheme();
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }


}
