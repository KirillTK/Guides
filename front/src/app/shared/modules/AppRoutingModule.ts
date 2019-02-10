import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPage} from "../../pages/langing-page/landing-page";


const routes: Routes = [
  {path: '', component: LandingPage}
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
