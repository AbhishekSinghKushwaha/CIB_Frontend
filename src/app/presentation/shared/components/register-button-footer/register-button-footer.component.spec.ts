import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterButtonFooterComponent } from './register-button-footer.component';

describe('RegisterButtonFooterComponent', () => {
  let component: RegisterButtonFooterComponent;
  let fixture: ComponentFixture<RegisterButtonFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterButtonFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterButtonFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
