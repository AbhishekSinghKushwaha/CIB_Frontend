import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFromModalComponent } from './transfer-from-modal.component';

describe('TransferFromModalComponent', () => {
  let component: TransferFromModalComponent;
  let fixture: ComponentFixture<TransferFromModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferFromModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFromModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
