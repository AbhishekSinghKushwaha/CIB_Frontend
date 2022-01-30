import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiftChargesComponent } from './swift-charges.component';

describe('SwiftChargesComponent', () => {
  let component: SwiftChargesComponent;
  let fixture: ComponentFixture<SwiftChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiftChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiftChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
