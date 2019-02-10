import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from '../../pages/langing-page/landing-page';
import {LoginPageComponent} from '../../pages/login-page/login-page';
import {RegistrationPageComponent} from '../../pages/registration-page/registration-page';


const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'registration', component: RegistrationPageComponent}
  // {path: 'film/:id', component: FilmComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, {})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
