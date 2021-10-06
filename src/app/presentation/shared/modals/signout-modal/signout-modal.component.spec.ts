import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutModalComponent } from './signout-modal.component';

describe('SignoutModalComponent', () => {
  let component: SignoutModalComponent;
  let fixture: ComponentFixture<SignoutModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignoutModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
