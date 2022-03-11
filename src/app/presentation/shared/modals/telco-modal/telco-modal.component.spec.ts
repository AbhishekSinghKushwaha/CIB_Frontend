import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelcoModalComponent } from './telco-modal.component';

describe('TelcoModalComponent', () => {
  let component: TelcoModalComponent;
  let fixture: ComponentFixture<TelcoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelcoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelcoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
