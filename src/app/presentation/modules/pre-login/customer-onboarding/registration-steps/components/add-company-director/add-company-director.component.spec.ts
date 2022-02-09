import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyDirectorComponent } from './add-company-director.component';

describe('AddCompanyDirectorComponent', () => {
  let component: AddCompanyDirectorComponent;
  let fixture: ComponentFixture<AddCompanyDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompanyDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompanyDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
