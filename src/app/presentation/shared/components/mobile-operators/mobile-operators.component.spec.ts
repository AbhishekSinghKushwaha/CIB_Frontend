import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileOperatorsComponent } from './mobile-operators.component';

describe('MobileOperatorsComponent', () => {
  let component: MobileOperatorsComponent;
  let fixture: ComponentFixture<MobileOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileOperatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
