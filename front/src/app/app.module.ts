import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LandingPageComponent} from './pages/langing-page/landing-page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './shared/modules/AppRoutingModule';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {FileService} from './shared/services/File.service';
import {MaterialComponentsModule} from './shared/modules/MaterialComponentsModule';
import {TagInputModule} from 'ngx-chips';
import {RatingModule} from 'ngx-rating';
import {LoginPageComponent} from './pages/login-page/login-page';
import {RegistrationPageComponent} from './pages/registration-page/registration-page';
import {UserPageComponent} from './pages/user-page/user-page';
import {AdminPageComponent} from './pages/admin-page/admin-page';
import {UserPageRouteGuard} from './shared/guards/UserPageRouteGuard';
import {AdminPageRouteGuard} from './shared/guards/AdminPageRouteGuard';
import {ListInstructionComponent} from './pages/user-page/components/list-instruction/list-instruction.component';
import {WriteInstructionComponent} from './pages/user-page/components/write-instruction/write-instruction.component';
import {FileDropModule} from 'ngx-file-drop';
import {AutosizeModule} from 'ngx-autosize';
import {InputFileConfig, InputFileModule} from 'ngx-input-file';
import {InstructionComponent} from './pages/user-page/components/instruction/instruction.component';
import {UserService} from './shared/services/User.service';
import {ListUsersComponent} from './pages/admin-page/components/list-users/list-user.component';

const config: InputFileConfig = {};

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    UserPageComponent,
    AdminPageComponent,
    ListInstructionComponent,
    WriteInstructionComponent,
    InstructionComponent,
    ListUsersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'Authentication'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MaterialComponentsModule,
    RatingModule,
    TagInputModule,
    FileDropModule,
    AutosizeModule,
    InputFileModule.forRoot(config)
  ],
  providers: [FileService, UserPageRouteGuard, AdminPageRouteGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
