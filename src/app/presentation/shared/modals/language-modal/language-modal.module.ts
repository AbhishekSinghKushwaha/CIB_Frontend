import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModalComponent } from './language-modal.component';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    LanguageModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  providers: [LanguageService]
})
export class LanguageModalModule { }
