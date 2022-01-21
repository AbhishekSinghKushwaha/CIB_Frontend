import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileOperatorsModalComponent } from './mobile-operators-modal.component';

describe('MobileOperatorsModalComponent', () => {
  let component: MobileOperatorsModalComponent;
  let fixture: ComponentFixture<MobileOperatorsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileOperatorsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileOperatorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
