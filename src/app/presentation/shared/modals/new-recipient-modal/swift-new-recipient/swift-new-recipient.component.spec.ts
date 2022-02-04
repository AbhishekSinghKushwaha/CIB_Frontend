import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwiftNewRecipientComponent } from './swift-new-recipient.component';

describe('SwiftNewRecipientComponent', () => {
  let component: SwiftNewRecipientComponent;
  let fixture: ComponentFixture<SwiftNewRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwiftNewRecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwiftNewRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
