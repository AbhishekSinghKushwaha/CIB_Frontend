import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAirtimeAmountComponent } from './select-airtime-amount.component';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';

describe('SelectAirtimeAmountComponent', () => {
  let component: SelectAirtimeAmountComponent;
  let fixture: ComponentFixture<SelectAirtimeAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule 
      ],
      declarations: [ SelectAirtimeAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAirtimeAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
