import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrySelectInputComponent } from './country-select-input.component';

describe('CountrySelectInputComponent', () => {
  let component: CountrySelectInputComponent;
  let fixture: ComponentFixture<CountrySelectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountrySelectInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrySelectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
