import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LandingPageComponent} from './pages/landing-page/landing-page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './shared/modules/AppRoutingModule';
import {HttpClient, HttpClientModule} from '@angular/common/http';
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
import {InstructionService} from './shared/services/Instruction.service';
import {AuthService} from './shared/services/AuthService';
import {CloudinaryModule} from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import {InstructionPageComponent} from './pages/instruction-page/instruction-page.component';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {AdminService} from './shared/services/Admin.service';
import {SettingPageComponent} from './pages/setting-page/setting-page.component';
import {SettingsService} from './shared/services/Settings.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {DragScrollModule} from 'ngx-drag-scroll/lib';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { TagsComponent } from './pages/landing-page/components/tags/tags.component';
import { CardInstructionsComponent } from './shared/components/card-instructions/card-instructions.component';

const config: InputFileConfig = {};
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

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
    ListUsersComponent,
    InstructionPageComponent,
    UserProfileComponent,
    SettingPageComponent,
    TagsComponent,
    CardInstructionsComponent
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
    InputFileModule.forRoot(config),
    CloudinaryModule.forRoot(Cloudinary, {cloud_name: 'kirilltk'}),
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    DragScrollModule,
    TagCloudModule
  ],
  providers: [
    FileService,
    UserPageRouteGuard,
    AdminPageRouteGuard,
    UserService,
    InstructionService,
    AuthService,
    AdminService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
