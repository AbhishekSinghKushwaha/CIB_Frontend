import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirtimeNewRecepientComponent } from './airtime-new-recepient.component';

describe('AirtimeNewRecepientComponent', () => {
  let component: AirtimeNewRecepientComponent;
  let fixture: ComponentFixture<AirtimeNewRecepientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirtimeNewRecepientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirtimeNewRecepientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
