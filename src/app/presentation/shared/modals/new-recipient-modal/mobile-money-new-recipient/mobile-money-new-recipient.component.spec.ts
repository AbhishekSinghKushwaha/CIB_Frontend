import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMoneyNewRecipientComponent } from './mobile-money-new-recipient.component';

describe('MobileMoneyNewRecipientComponent', () => {
  let component: MobileMoneyNewRecipientComponent;
  let fixture: ComponentFixture<MobileMoneyNewRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileMoneyNewRecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMoneyNewRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
