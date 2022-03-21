import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserFormComponent } from './corporate-user-form.component';

describe('CorporateUserFormComponent', () => {
  let component: CorporateUserFormComponent;
  let fixture: ComponentFixture<CorporateUserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateUserFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
