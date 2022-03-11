import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMobileWalletComponent } from './select-mobile-wallet.component';

describe('SelectMobileWalletComponent', () => {
  let component: SelectMobileWalletComponent;
  let fixture: ComponentFixture<SelectMobileWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectMobileWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectMobileWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
