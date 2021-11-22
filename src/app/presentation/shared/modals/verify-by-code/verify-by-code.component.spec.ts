import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyByCodeComponent } from './verify-by-code.component';

describe('VerifyByCodeComponent', () => {
  let component: VerifyByCodeComponent;
  let fixture: ComponentFixture<VerifyByCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyByCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyByCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
