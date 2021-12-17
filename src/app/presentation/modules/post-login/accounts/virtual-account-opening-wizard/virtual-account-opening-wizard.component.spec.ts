import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualAccountOpeningWizardComponent } from './virtual-account-opening-wizard.component';

describe('VirtualAccountOpeningWizardComponent', () => {
  let component: VirtualAccountOpeningWizardComponent;
  let fixture: ComponentFixture<VirtualAccountOpeningWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualAccountOpeningWizardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualAccountOpeningWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
