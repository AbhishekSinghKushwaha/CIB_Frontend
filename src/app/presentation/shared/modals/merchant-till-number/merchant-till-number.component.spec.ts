import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantTillNumberComponent } from './merchant-till-number.component';

describe('MerchantTillNumberComponent', () => {
  let component: MerchantTillNumberComponent;
  let fixture: ComponentFixture<MerchantTillNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantTillNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantTillNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
