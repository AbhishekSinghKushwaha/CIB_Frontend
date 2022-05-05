import { Component, Inject, LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth/auth.service';
import { LanguageService } from './core/services/language/language.service';
import { CustomIconService } from './core/utils/custom-icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Corporate Internet Banking';

  constructor(
    private customIconService: CustomIconService,
    private readonly languageService: LanguageService,
    public translate: TranslateService,
    public readonly authService: AuthService) {
    this.customIconService.init();
    const languages = this.languageService.languages.map(x => x.langCode);
    const defaultLang = this.languageService.defaultLanguage;
    translate.addLangs(languages);
    translate.setDefaultLang(defaultLang.langCode);
    // this.authService.idleWarning()
  }
}
