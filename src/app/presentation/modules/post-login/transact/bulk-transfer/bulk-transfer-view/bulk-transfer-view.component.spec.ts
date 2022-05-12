import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkTransferViewComponent } from './bulk-transfer-view.component';

describe('BulkTransferViewComponent', () => {
  let component: BulkTransferViewComponent;
  let fixture: ComponentFixture<BulkTransferViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkTransferViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkTransferViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
