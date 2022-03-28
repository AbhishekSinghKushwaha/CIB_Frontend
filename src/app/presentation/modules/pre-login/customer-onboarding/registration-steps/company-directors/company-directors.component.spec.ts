import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDirectorsComponent } from './company-directors.component';

describe('CompanyDirectorsComponent', () => {
  let component: CompanyDirectorsComponent;
  let fixture: ComponentFixture<CompanyDirectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDirectorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDirectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
