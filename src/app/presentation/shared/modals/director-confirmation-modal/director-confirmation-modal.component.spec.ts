import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorConfirmationModalComponent } from './director-confirmation-modal.component';

describe('DirectorConfirmationModalComponent', () => {
  let component: DirectorConfirmationModalComponent;
  let fixture: ComponentFixture<DirectorConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
