import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LandingPageComponent} from './pages/langing-page/landing-page';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './shared/modules/AppRoutingModule';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FileService} from './shared/services/File.service';
import {MaterialComponentsModule} from './shared/modules/MaterialComponentsModule';
import {RatingModule} from 'ngx-rating';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'Authentication'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialComponentsModule,
    RatingModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
