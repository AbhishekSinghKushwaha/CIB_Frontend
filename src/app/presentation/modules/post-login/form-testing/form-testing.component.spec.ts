import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTestingComponent } from './form-testing.component';

describe('FormTestingComponent', () => {
  let component: FormTestingComponent;
  let fixture: ComponentFixture<FormTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
