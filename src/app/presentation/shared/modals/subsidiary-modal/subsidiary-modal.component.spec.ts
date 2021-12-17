import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiaryModalComponent } from './subsidiary-modal.component';

describe('SubsidiaryModalComponent', () => {
  let component: SubsidiaryModalComponent;
  let fixture: ComponentFixture<SubsidiaryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsidiaryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidiaryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
