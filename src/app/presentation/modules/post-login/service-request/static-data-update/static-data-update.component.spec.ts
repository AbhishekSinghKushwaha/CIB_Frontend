import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticDataUpdateComponent } from './static-data-update.component';

describe('StaticDataUpdateComponent', () => {
  let component: StaticDataUpdateComponent;
  let fixture: ComponentFixture<StaticDataUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticDataUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticDataUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
