import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferToModalComponent } from './transfer-to-modal.component';

describe('TransferToModalComponent', () => {
  let component: TransferToModalComponent;
  let fixture: ComponentFixture<TransferToModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferToModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferToModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
