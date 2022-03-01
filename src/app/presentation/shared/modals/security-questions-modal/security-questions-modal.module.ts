import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityQuestionsModalComponent } from './security-questions-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    SecurityQuestionsModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
  ]
})
export class SecurityQuestionsModalModule { }
