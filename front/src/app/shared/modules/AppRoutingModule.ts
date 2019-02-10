import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from '../../pages/langing-page/landing-page';
import {LoginPageComponent} from '../../pages/login-page/login-page';
import {RegistrationPageComponent} from '../../pages/registration-page/registration-page';
import {UserPageComponent} from '../../pages/user-page/user-page';
import {AdminPageComponent} from '../../pages/admin-page/admin-page';
import {UserPageRouteGuard} from '../guards/UserPageRouteGuard';
import {AdminPageRouteGuard} from '../guards/AdminPageRouteGuard';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent},
  {path: 'user/:id', component: UserPageComponent, canActivate: [UserPageRouteGuard]},
  {path: 'admin', component: AdminPageComponent, canActivate: [AdminPageRouteGuard]}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
