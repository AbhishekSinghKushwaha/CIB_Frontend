import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDocumentDownloadActionsComponent } from './statement-document-download-actions.component';

describe('StatementDocumentDownloadActionsComponent', () => {
  let component: StatementDocumentDownloadActionsComponent;
  let fixture: ComponentFixture<StatementDocumentDownloadActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementDocumentDownloadActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementDocumentDownloadActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
