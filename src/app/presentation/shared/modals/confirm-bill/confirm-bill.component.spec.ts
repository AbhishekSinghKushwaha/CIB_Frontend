import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmBillComponent } from './confirm-bill.component';

describe('ConfirmBillComponent', () => {
  let component: ConfirmBillComponent;
  let fixture: ComponentFixture<ConfirmBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmBillComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
