import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantAddedSuccessfulComponent } from './merchant-added-successful.component';

describe('MerchantAddedSuccessfulComponent', () => {
  let component: MerchantAddedSuccessfulComponent;
  let fixture: ComponentFixture<MerchantAddedSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantAddedSuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantAddedSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
