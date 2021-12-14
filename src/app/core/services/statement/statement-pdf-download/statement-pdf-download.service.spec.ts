import { TestBed } from '@angular/core/testing';

import { StatementPdfDownloadService } from './statement-pdf-download.service';

describe('StatementPdfDownloadService', () => {
  let service: StatementPdfDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatementPdfDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
