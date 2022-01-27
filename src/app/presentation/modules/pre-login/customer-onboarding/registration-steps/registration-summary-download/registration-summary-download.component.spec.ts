import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSummaryDownloadComponent } from './registration-summary-download.component';

describe('RegistrationSummaryDownloadComponent', () => {
  let component: RegistrationSummaryDownloadComponent;
  let fixture: ComponentFixture<RegistrationSummaryDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationSummaryDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSummaryDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
