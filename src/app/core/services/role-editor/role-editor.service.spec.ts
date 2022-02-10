import { TestBed } from '@angular/core/testing';

import { RoleEditorService } from './role-editor.service';

describe('RoleEditorService', () => {
  let service: RoleEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
