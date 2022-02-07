import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationCompletionComponent } from './confirmation-completion.component';

describe('ConfirmationCompletionComponent', () => {
  let component: ConfirmationCompletionComponent;
  let fixture: ComponentFixture<ConfirmationCompletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationCompletionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationCompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
