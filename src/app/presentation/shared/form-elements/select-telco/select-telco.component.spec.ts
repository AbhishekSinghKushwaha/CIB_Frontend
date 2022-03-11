import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTelcoComponent } from './select-telco.component';

describe('SelectTelcoComponent', () => {
  let component: SelectTelcoComponent;
  let fixture: ComponentFixture<SelectTelcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTelcoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTelcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
