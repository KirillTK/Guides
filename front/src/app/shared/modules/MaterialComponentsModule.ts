import {MatCardModule, MatToolbarModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule
  ]
})
export class MaterialComponentsModule {
}
