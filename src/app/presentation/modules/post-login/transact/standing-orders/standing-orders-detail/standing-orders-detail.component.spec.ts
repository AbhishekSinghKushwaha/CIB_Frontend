import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingOrdersDetailComponent } from './standing-orders-detail.component';

describe('StandingOrdersDetailComponent', () => {
  let component: StandingOrdersDetailComponent;
  let fixture: ComponentFixture<StandingOrdersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandingOrdersDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingOrdersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
