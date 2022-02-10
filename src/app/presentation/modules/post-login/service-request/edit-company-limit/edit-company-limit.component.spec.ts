import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyLimitComponent } from './edit-company-limit.component';

describe('EditCompanyLimitComponent', () => {
  let component: EditCompanyLimitComponent;
  let fixture: ComponentFixture<EditCompanyLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
