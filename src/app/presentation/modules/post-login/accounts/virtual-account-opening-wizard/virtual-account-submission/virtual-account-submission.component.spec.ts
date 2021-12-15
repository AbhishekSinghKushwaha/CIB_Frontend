import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualAccountSubmissionComponent } from './virtual-account-submission.component';

describe('VirtualAccountSubmissionComponent', () => {
  let component: VirtualAccountSubmissionComponent;
  let fixture: ComponentFixture<VirtualAccountSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualAccountSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualAccountSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
