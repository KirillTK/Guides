import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule, MatListModule, MatSelectModule, MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule
  ],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatSelectModule,
    MatListModule
  ]
})
export class MaterialComponentsModule {
}
