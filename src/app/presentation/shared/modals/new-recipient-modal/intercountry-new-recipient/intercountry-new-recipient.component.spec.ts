import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntercountryNewRecipientComponent } from './intercountry-new-recipient.component';

describe('IntercountryNewRecipientComponent', () => {
  let component: IntercountryNewRecipientComponent;
  let fixture: ComponentFixture<IntercountryNewRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntercountryNewRecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntercountryNewRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
