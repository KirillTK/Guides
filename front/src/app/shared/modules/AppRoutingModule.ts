import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from '../../pages/landing-page/landing-page';
import {LoginPageComponent} from '../../pages/login-page/login-page';
import {RegistrationPageComponent} from '../../pages/registration-page/registration-page';
import {UserPageComponent} from '../../pages/user-page/user-page';
import {AdminPageComponent} from '../../pages/admin-page/admin-page';
import {UserPageRouteGuard} from '../guards/UserPageRouteGuard';
import {AdminPageRouteGuard} from '../guards/AdminPageRouteGuard';
import {InstructionPageComponent} from '../../pages/instruction-page/instruction-page.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {SettingPageComponent} from '../../pages/setting-page/setting-page.component';
import {InstructionsByTagPageComponent} from '../../pages/instructions-by-tag-page/instructions-by-tag-page.component';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'user/:id', component: UserPageComponent, canActivate: [UserPageRouteGuard]},
  {path: 'admin/:id', component: AdminPageComponent, canActivate: [AdminPageRouteGuard]},
  {path: 'instruction/:id', component: InstructionPageComponent},
  {path: 'profile/:id', component: UserProfileComponent},
  {path: 'settings', component: SettingPageComponent},
  {path: 'instructions/:tag', component: InstructionsByTagPageComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
