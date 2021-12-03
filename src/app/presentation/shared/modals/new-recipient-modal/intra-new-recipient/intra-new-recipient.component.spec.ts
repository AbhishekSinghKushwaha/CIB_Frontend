import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraNewRecipientComponent } from './intra-new-recipient.component';

describe('IntraNewRecipientComponent', () => {
  let component: IntraNewRecipientComponent;
  let fixture: ComponentFixture<IntraNewRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntraNewRecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntraNewRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
