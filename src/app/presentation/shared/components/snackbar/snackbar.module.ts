import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SnackbarComponent } from './snackbar.component';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, MatStyleModule],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 10000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'default-snackbar',
      },
    },
  ],
  exports: [SnackbarComponent],
})
export class SnackbarModule {}
