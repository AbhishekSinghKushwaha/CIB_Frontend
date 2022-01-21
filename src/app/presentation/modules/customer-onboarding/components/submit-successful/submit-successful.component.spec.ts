import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSuccessfulComponent } from './submit-successful.component';

describe('SubmitSuccessfulComponent', () => {
  let component: SubmitSuccessfulComponent;
  let fixture: ComponentFixture<SubmitSuccessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitSuccessfulComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitSuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
