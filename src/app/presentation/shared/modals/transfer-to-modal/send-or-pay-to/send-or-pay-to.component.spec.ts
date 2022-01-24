import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOrPayToComponent } from './send-or-pay-to.component';

describe('SendOrPayToComponent', () => {
  let component: SendOrPayToComponent;
  let fixture: ComponentFixture<SendOrPayToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendOrPayToComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOrPayToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
