import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogService } from 'src/app/core/services/confirm-dialog/confirm-dialog.service';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  imports: [
    CommonModule,
    MatStyleModule
  ],
  declarations: [
    ConfirmDialogComponent
  ],
  exports: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [ConfirmDialogService]
})
export class ConfirmDialogModule {
  static injector: Injector;

  constructor(injector: Injector) {
    ConfirmDialogModule.injector = injector;
  }
}
