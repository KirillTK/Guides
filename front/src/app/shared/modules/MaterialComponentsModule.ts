import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatExpansionModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatMenuModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule, MatStepperModule,
  MatTableModule,
  MatTabsModule,
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
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatStepperModule,
    MatExpansionModule
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
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatStepperModule,
    MatExpansionModule
  ]
})
export class MaterialComponentsModule {
}
