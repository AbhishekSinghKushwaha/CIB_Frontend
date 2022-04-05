import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingOrdersFormComponent } from './standing-orders-form.component';

describe('StandingOrdersFormComponent', () => {
  let component: StandingOrdersFormComponent;
  let fixture: ComponentFixture<StandingOrdersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingOrdersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingOrdersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
