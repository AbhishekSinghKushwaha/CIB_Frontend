import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadConfirmationComponent } from './upload-confirmation.component';
import { UploadConfirmationService } from 'src/app/core/services/upload-confirmation/upload-confirmation.service';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    UploadConfirmationComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    UploadConfirmationComponent
  ],
  providers:[
    UploadConfirmationService
  ]
})
export class UploadConfirmationModule { }
