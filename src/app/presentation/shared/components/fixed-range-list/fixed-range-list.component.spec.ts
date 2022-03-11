import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedRangeListComponent } from './fixed-range-list.component';

describe('FixedRangeListComponent', () => {
  let component: FixedRangeListComponent;
  let fixture: ComponentFixture<FixedRangeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedRangeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedRangeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
