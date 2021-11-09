import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTransferComponent } from './complete-transfer.component';

describe('CompleteTransferComponent', () => {
  let component: CompleteTransferComponent;
  let fixture: ComponentFixture<CompleteTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
