import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneLinkedModalComponent } from './phone-linked-modal.component';

describe('PhoneLinkedModalComponent', () => {
  let component: PhoneLinkedModalComponent;
  let fixture: ComponentFixture<PhoneLinkedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneLinkedModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneLinkedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
