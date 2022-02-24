import { TestBed } from '@angular/core/testing';

import { UserManagementSuccessService } from './user-management-success.service';

describe('UserManagementSuccessService', () => {
  let service: UserManagementSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
