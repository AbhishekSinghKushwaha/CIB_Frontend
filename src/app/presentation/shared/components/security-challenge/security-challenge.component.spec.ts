import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityChallengeComponent } from './security-challenge.component';

describe('SecurityChallengeComponent', () => {
  let component: SecurityChallengeComponent;
  let fixture: ComponentFixture<SecurityChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecurityChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
