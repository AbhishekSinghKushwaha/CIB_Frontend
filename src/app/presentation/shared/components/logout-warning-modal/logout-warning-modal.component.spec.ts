import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogoutWarningModalComponent } from './logout-warning-modal.component';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';

describe('LogoutWarningModalComponent', () => {
  let component: LogoutWarningModalComponent;
  let fixture: ComponentFixture<LogoutWarningModalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NgbModalModule, MatCardModule],
        declarations: [LogoutWarningModalComponent],
        providers: [NgbActiveModal],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutWarningModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
