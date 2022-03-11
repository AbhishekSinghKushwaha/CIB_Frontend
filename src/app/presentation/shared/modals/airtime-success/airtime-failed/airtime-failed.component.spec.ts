import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirtimeFailedComponent } from './airtime-failed.component';

describe('AirtimeFailedComponent', () => {
  let component: AirtimeFailedComponent;
  let fixture: ComponentFixture<AirtimeFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirtimeFailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirtimeFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
