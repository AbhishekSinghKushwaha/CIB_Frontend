import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionSuccessfulComponent } from './submission-successful.component';

describe('SubmissionSuccessfulComponent', () => {
  let component: SubmissionSuccessfulComponent;
  let fixture: ComponentFixture<SubmissionSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionSuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
