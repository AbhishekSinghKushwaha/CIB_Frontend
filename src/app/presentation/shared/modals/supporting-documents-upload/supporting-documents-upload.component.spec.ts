import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportingDocumentsUploadComponent } from './supporting-documents-upload.component';

describe('SupportingDocumentsUploadComponent', () => {
  let component: SupportingDocumentsUploadComponent;
  let fixture: ComponentFixture<SupportingDocumentsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportingDocumentsUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportingDocumentsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
