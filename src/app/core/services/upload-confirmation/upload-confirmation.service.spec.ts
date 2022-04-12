import { TestBed } from '@angular/core/testing';

import { UploadConfirmationService } from './upload-confirmation.service';

describe('UploadConfirmationService', () => {
  let service: UploadConfirmationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadConfirmationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
