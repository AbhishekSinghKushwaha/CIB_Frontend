import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMoneyComponent } from './mobile-money.component';

describe('MobileMoneyComponent', () => {
  let component: MobileMoneyComponent;
  let fixture: ComponentFixture<MobileMoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileMoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
