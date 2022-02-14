import { TestBed } from '@angular/core/testing';

import { DeviceManagementService } from './device-management.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('DeviceManagementService', () => {
  let service: DeviceManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule],
    });
    service = TestBed.inject(DeviceManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
