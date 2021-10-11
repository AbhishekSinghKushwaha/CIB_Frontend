import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAccountSendToComponent } from './select-account-send-to.component';

describe('SelectAccountSendToComponent', () => {
  let component: SelectAccountSendToComponent;
  let fixture: ComponentFixture<SelectAccountSendToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAccountSendToComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAccountSendToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
