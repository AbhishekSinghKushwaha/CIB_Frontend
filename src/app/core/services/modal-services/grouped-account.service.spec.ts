/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroupedAccountService } from './grouped-account.service';

describe('Service: GroupedAccount', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupedAccountService]
    });
  });

  it('should ...', inject([GroupedAccountService], (service: GroupedAccountService) => {
    expect(service).toBeTruthy();
  }));
});
