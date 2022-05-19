import { PresentationModule } from './presentation/presentation.module';
import { CoreModule } from './core/core.module';
import { DataModule } from './data/data.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStyleModule } from './mat-style.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserRepository } from './core/repositories/user.repository';
import { UserMockRepository } from './data/repository/user-mock-repository/user-mock.repository';
import { ErrorIntercept } from './core/utils/interceptors/error.interceptor';
import { AuthTokenInterceptor } from './core/utils/interceptors/auth-token.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageModalModule } from './presentation/shared/modals/language-modal/language-modal.module';
import { httpTranslateLoader, LanguageTranslateModule } from './translate.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';

@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatStyleModule,
    DataModule,
    CoreModule,
    PresentationModule,
    LanguageModalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    LanguageTranslateModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.none,  
      backdropBackgroundColour: 'rgba(0,0,0,0.8)',
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    })
  ],
  exports: [AppRoutingModule],
  providers: [
    { provide: UserRepository, useClass: UserMockRepository },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }