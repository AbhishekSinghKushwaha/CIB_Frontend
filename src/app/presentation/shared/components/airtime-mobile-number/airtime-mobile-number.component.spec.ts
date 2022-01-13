import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirtimeMobileNumberComponent } from './airtime-mobile-number.component';

describe('AirtimeMobileNumberComponent', () => {
  let component: AirtimeMobileNumberComponent;
  let fixture: ComponentFixture<AirtimeMobileNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirtimeMobileNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirtimeMobileNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
