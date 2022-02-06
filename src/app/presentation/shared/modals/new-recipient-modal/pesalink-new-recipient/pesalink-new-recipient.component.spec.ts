import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesalinkNewRecipientComponent } from './pesalink-new-recipient.component';

describe('PesalinkNewRecipientComponent', () => {
  let component: PesalinkNewRecipientComponent;
  let fixture: ComponentFixture<PesalinkNewRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesalinkNewRecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesalinkNewRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
