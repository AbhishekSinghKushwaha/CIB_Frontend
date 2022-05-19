import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBillersComponent } from './select-billers.component';

describe('SelectBillersComponent', () => {
  let component: SelectBillersComponent;
  let fixture: ComponentFixture<SelectBillersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectBillersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBillersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
