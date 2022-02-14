import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogoutConfirmationModalComponent } from './logout-confirmation-modal.component';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('LogoutConfirmationModalComponent', () => {
  let component: LogoutConfirmationModalComponent;
  let fixture: ComponentFixture<LogoutConfirmationModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          NgbModalModule,
          MatIconModule,
          MatCardModule,
          RouterTestingModule,
          HttpClientTestingModule,

          MatDialogModule,
          MatSnackBarModule,
        ],
        declarations: [LogoutConfirmationModalComponent],
        providers: [NgbActiveModal],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
