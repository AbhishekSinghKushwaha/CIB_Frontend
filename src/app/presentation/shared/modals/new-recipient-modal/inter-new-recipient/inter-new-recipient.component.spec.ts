import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterNewRecipientComponent } from './inter-new-recipient.component';

describe('InterNewRecipientComponent', () => {
  let component: InterNewRecipientComponent;
  let fixture: ComponentFixture<InterNewRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterNewRecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterNewRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
