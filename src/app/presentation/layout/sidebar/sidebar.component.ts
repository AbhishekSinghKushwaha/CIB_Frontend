import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageModel } from 'src/app/core/domain/language.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LanguageService } from 'src/app/core/services/language/language.service';
import { environment } from 'src/environments/environment';
import { confirmModal } from '../../shared/decorators/confirm-dialog.decorator';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  language: LanguageModel;

  @Output() ToggleSideMenu = new EventEmitter();
  constructor(private readonly authService: AuthService,
    private readonly languageService: LanguageService,
    public translate: TranslateService) {
    this.language = languageService.defaultLanguage;
  }

  ngOnInit(): void { }

  toggleSideMenu(): void {
    this.ToggleSideMenu.emit();
  }

  returnLogoUrl(): string {
    return `assets/images/logos/${environment.appInstance}/Primary.svg`;
  }

  @confirmModal({
    title: 'Are you sure you want to signout',
    message: '',
    cancelText: 'Keep me in',
    confirmText: 'Sign me out',
  })
  logout() {
    this.authService.doLogout()
  }



  openLanguageModal() {
    const languages = this.languageService.languages;
    this.languageService.open(languages).afterClosed().subscribe(
      (selected: LanguageModel) => {
        if (selected) {
          this.language = selected;
          this.languageService.setCurrentLanguage(selected);
          this.translate.use(selected.langCode)
        }
      }

    );
  }
}
