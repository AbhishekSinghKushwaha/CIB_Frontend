import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationMenuItemComponent } from './notification-menu-item.component';

describe('NotificationMenuItemComponent', () => {
  let component: NotificationMenuItemComponent;
  let fixture: ComponentFixture<NotificationMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
