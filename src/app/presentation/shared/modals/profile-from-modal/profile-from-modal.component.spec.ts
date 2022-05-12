import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFromModalComponent } from './profile-from-modal.component';

describe('ProfileFromModalComponent', () => {
  let component: ProfileFromModalComponent;
  let fixture: ComponentFixture<ProfileFromModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileFromModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFromModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
