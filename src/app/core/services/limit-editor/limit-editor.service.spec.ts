import { TestBed } from '@angular/core/testing';

import { LimitEditorService } from './limit-editor.service';

describe('LimitEditorService', () => {
  let service: LimitEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LimitEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
