import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiftChargesModalComponent } from './swift-charges-modal.component';

describe('SwiftChargesModalComponent', () => {
  let component: SwiftChargesModalComponent;
  let fixture: ComponentFixture<SwiftChargesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiftChargesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiftChargesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
