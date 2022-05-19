
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth/auth.service';
import { LanguageService } from './core/services/language/language.service';
import { CustomIconService } from './core/utils/custom-icon.service';
import { SpinnerService } from './core/services/spinner/spinner.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Corporate Internet Banking';
  loading: boolean;

  constructor(
    private customIconService: CustomIconService,
    private readonly languageService: LanguageService,
    public translate: TranslateService,
    public readonly authService: AuthService,
    private readonly spinnerService: SpinnerService,) {
    this.customIconService.init();
    const languages = this.languageService.languages.map(x => x.langCode);
    const defaultLang = this.languageService.defaultLanguage;
    translate.addLangs(languages);
    translate.setDefaultLang(defaultLang.langCode);
    // this.authService.idleWarning()
  }

  ngOnInit() {
    this.loadingListener();
  }

  loadingListener(): void {
    this.spinnerService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading: boolean) => {
        this.loading = loading;
      });
  }
}