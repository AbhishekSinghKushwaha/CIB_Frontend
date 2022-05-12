import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkTransferDetailComponent } from './bulk-transfer-detail.component';

describe('BulkTransferDetailComponent', () => {
  let component: BulkTransferDetailComponent;
  let fixture: ComponentFixture<BulkTransferDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkTransferDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkTransferDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
