import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequebookRequestCompletedComponent } from './chequebook-request-completed.component';

describe('ChequebookRequestCompletedComponent', () => {
  let component: ChequebookRequestCompletedComponent;
  let fixture: ComponentFixture<ChequebookRequestCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChequebookRequestCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequebookRequestCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
