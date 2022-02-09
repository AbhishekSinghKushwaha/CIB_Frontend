import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipientModalComponent } from './new-recipient-modal.component';

describe('NewRecipientModalComponent', () => {
  let component: NewRecipientModalComponent;
  let fixture: ComponentFixture<NewRecipientModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewRecipientModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecipientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
