import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherEquityAccountComponent } from './other-equity-account.component';

describe('OtherEquityAccountComponent', () => {
  let component: OtherEquityAccountComponent;
  let fixture: ComponentFixture<OtherEquityAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherEquityAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherEquityAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
