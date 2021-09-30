import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOwnEquityComponent } from './send-own-equity.component';

describe('SendOwnEquityComponent', () => {
  let component: SendOwnEquityComponent;
  let fixture: ComponentFixture<SendOwnEquityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendOwnEquityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOwnEquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
