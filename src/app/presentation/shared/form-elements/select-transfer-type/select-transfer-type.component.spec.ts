import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTransferTypeComponent } from './select-transfer-type.component';

describe('SelectTransferTypeComponent', () => {
  let component: SelectTransferTypeComponent;
  let fixture: ComponentFixture<SelectTransferTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTransferTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTransferTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
