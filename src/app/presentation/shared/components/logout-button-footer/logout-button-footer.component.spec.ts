import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutButtonFooterComponent } from './logout-button-footer.component';

describe('LogoutButtonFooterComponent', () => {
  let component: LogoutButtonFooterComponent;
  let fixture: ComponentFixture<LogoutButtonFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutButtonFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutButtonFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
