import { TestBed } from '@angular/core/testing';

import { DeleteTeamMemberService } from './delete-team-member.service';

describe('DeleteTeamMemberService', () => {
  let service: DeleteTeamMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteTeamMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
