import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { CustomIconService } from './core/utils/custom-icon.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

const MatImports = [
  MatSidenavModule,
  MatToolbarModule,
  MatButtonModule,
  MatListModule,
  MatInputModule,
  MatCardModule,
  MatMenuModule,
  MatTreeModule,
  MatTableModule,
  MatSortModule,
  MatIconModule,
  MatDialogModule,
  MatGridListModule,
  MatCheckboxModule,
  MatSelectModule,
  MatDatepickerModule,
  MatProgressBarModule,
  MatRippleModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatChipsModule,
  MatNativeDateModule,
  MatRadioModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatButtonToggleModule,
];



@NgModule({
  declarations: [],
  imports: MatImports,
  exports: MatImports,
  providers: [CustomIconService],
})
export class MatStyleModule { }
