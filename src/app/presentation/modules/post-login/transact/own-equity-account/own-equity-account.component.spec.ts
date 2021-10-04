import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnEquityAccountComponent } from './own-equity-account.component';

describe('OwnEquityAccountComponent', () => {
  let component: OwnEquityAccountComponent;
  let fixture: ComponentFixture<OwnEquityAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnEquityAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnEquityAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
