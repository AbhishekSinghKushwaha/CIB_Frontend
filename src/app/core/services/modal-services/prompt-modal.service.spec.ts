import { TestBed } from '@angular/core/testing';

import { PromptModalService } from './prompt-modal.service';

describe('PromptModalService', () => {
  let service: PromptModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
