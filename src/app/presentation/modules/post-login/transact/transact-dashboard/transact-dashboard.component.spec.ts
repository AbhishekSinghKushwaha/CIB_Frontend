import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactDashboardComponent } from './transact-dashboard.component';

describe('TransactDashboardComponent', () => {
  let component: TransactDashboardComponent;
  let fixture: ComponentFixture<TransactDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
