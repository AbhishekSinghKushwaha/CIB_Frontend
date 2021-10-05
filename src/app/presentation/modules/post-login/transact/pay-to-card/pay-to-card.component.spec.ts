import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayToCardComponent } from './pay-to-card.component';

describe('PayToCardComponent', () => {
  let component: PayToCardComponent;
  let fixture: ComponentFixture<PayToCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayToCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayToCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
