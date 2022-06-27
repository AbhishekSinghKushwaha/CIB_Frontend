import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  SecurityQuestionsRoutingModule } from './security-questions-routing.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationModalModule } from 'src/app/presentation/shared/modals/notification-modal/notification-modal.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { SecurityQuestionsComponent } from './security-questions.component';
import { SecurityQuestionListComponent } from '../components/security-question-list/security-question-list.component';

@NgModule({
  declarations: [SecurityQuestionsComponent, SecurityQuestionListComponent],
  imports: [
    CommonModule,
    SecurityQuestionsRoutingModule,
    ReactiveFormsModule,
    MatStyleModule,
    NotificationModalModule,
    SharedComponentsModule
  ],
})
export class SecurityQuestionsModule { }
