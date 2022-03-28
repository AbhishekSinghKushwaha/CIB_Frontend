import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirtimeSuccessComponent } from './airtime-success.component';

describe('AirtimeSuccessComponent', () => {
  let component: AirtimeSuccessComponent;
  let fixture: ComponentFixture<AirtimeSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirtimeSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirtimeSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
