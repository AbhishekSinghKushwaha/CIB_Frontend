import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedForApprovalComponent } from './completed-for-approval.component';

describe('CompletedForApprovalComponent', () => {
  let component: CompletedForApprovalComponent;
  let fixture: ComponentFixture<CompletedForApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedForApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedForApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
