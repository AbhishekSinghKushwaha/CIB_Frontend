import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { DeleteService } from 'src/app/core/services/delete/delete.service';



@NgModule({
  declarations: [
    DeleteComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    DeleteComponent
  ],
  providers: [
    DeleteService
  ]
})
export class DeleteModule { }
