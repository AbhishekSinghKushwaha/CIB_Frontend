import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiaryListItemComponent } from './subsidiary-list-item.component';

describe('SubsidiaryListItemComponent', () => {
  let component: SubsidiaryListItemComponent;
  let fixture: ComponentFixture<SubsidiaryListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsidiaryListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsidiaryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
