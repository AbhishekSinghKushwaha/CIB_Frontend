import { PresentationModule } from './presentation/presentation.module';
import { CoreModule } from './core/core.module';
import { DataModule } from './data/data.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStyleModule } from './mat-style.module';
import { LayoutModule } from './presentation/layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { UserRepository } from './core/repositories/user.repository';
import { UserMockRepository } from './data/repository/user-mock-repository/user-mock.repository';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatStyleModule,
    LayoutModule,
    DataModule,
    CoreModule,
    PresentationModule,
  ],
  exports: [AppRoutingModule],
  providers: [{ provide: UserRepository, useClass: UserMockRepository }],
  bootstrap: [AppComponent],
})
export class AppModule {}
