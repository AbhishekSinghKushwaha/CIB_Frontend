import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactMenuItemComponent } from './transact-menu-item.component';

describe('TransactMenuItemComponent', () => {
  let component: TransactMenuItemComponent;
  let fixture: ComponentFixture<TransactMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactMenuItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
