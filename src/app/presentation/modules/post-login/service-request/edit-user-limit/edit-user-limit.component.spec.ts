import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserLimitComponent } from './edit-user-limit.component';

describe('EditUserLimitComponent', () => {
  let component: EditUserLimitComponent;
  let fixture: ComponentFixture<EditUserLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserLimitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
