import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentWithdrawalComponent } from './agent-withdrawal.component';

describe('AgentWithdrawalComponent', () => {
  let component: AgentWithdrawalComponent;
  let fixture: ComponentFixture<AgentWithdrawalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgentWithdrawalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
