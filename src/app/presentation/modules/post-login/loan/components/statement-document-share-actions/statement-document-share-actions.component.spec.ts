import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDocumentShareActionsComponent } from './statement-document-share-actions.component';

describe('StatementDocumentShareActionsComponent', () => {
  let component: StatementDocumentShareActionsComponent;
  let fixture: ComponentFixture<StatementDocumentShareActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementDocumentShareActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementDocumentShareActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
