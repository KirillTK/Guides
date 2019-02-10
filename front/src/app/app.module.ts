import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LandingPage} from "./pages/langing-page/landing-page";
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./shared/modules/AppRoutingModule";

@NgModule({
  declarations: [
    AppComponent,
    LandingPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
