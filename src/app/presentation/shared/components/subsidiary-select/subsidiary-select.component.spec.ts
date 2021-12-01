import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiarySelectComponent } from './subsidiary-select.component';

describe('SubsidiarySelectComponent', () => {
  let component: SubsidiarySelectComponent;
  let fixture: ComponentFixture<SubsidiarySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsidiarySelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidiarySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
