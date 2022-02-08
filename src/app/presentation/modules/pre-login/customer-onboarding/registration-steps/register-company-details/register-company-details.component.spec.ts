import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCompanyDetailsComponent } from './register-company-details.component';

describe('RegisterCompanyDetailsComponent', () => {
  let component: RegisterCompanyDetailsComponent;
  let fixture: ComponentFixture<RegisterCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCompanyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
