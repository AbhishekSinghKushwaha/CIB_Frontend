import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseTransactComponent } from './base-transact.component';

describe('BaseTransactComponent', () => {
  let component: BaseTransactComponent;
  let fixture: ComponentFixture<BaseTransactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseTransactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseTransactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
