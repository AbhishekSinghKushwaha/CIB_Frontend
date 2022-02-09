import { TestBed } from '@angular/core/testing';

import { SupportingDocumentsUploadService } from './supporting-documents-upload.service';

describe('SupportingDocumentsUploadService', () => {
  let service: SupportingDocumentsUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupportingDocumentsUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
