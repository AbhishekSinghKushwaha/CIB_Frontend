import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalAirtimeAmountRangeComponent } from './international-airtime-amount-range.component';

describe('InternationalAirtimeAmountRangeComponent', () => {
  let component: InternationalAirtimeAmountRangeComponent;
  let fixture: ComponentFixture<InternationalAirtimeAmountRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalAirtimeAmountRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalAirtimeAmountRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
