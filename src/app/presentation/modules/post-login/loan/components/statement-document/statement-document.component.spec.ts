import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDocumentComponent } from './statement-document.component';

describe('StatementDocumentComponent', () => {
  let component: StatementDocumentComponent;
  let fixture: ComponentFixture<StatementDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
