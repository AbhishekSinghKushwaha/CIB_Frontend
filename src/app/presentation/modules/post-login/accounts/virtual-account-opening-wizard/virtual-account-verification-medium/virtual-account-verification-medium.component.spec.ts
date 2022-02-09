import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualAccountVerificationMediumComponent } from './virtual-account-verification-medium.component';

describe('VirtualAccountVerificationMediumComponent', () => {
  let component: VirtualAccountVerificationMediumComponent;
  let fixture: ComponentFixture<VirtualAccountVerificationMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualAccountVerificationMediumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualAccountVerificationMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
