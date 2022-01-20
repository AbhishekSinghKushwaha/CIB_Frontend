import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntercountryFundTransferComponent } from './intercountry-fund-transfer.component';

describe('IntercountryFundTransferComponent', () => {
  let component: IntercountryFundTransferComponent;
  let fixture: ComponentFixture<IntercountryFundTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntercountryFundTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntercountryFundTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
