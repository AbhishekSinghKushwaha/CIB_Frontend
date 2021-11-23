import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepientBankModalComponent } from './recepient-bank-modal.component';

describe('RecepientBankModalComponent', () => {
  let component: RecepientBankModalComponent;
  let fixture: ComponentFixture<RecepientBankModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecepientBankModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepientBankModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
