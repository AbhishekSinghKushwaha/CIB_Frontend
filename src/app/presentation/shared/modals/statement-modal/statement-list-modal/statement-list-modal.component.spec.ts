import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementListModalComponent } from './statement-list-modal.component';

describe('StatementListModalComponent', () => {
  let component: StatementListModalComponent;
  let fixture: ComponentFixture<StatementListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
