import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateCredentialsComponent } from './validate-credentials.component';

describe('ValidateCredentialsComponent', () => {
  let component: ValidateCredentialsComponent;
  let fixture: ComponentFixture<ValidateCredentialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateCredentialsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
