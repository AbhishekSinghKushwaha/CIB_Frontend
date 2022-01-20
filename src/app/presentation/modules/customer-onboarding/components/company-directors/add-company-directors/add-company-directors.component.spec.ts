import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyDirectorsComponent } from './add-company-directors.component';

describe('AddCompanyDirectorsComponent', () => {
  let component: AddCompanyDirectorsComponent;
  let fixture: ComponentFixture<AddCompanyDirectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyDirectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
