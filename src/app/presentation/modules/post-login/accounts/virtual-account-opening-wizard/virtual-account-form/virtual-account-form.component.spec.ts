import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualAccountFormComponent } from './virtual-account-form.component';

describe('VirtualAccountFormComponent', () => {
  let component: VirtualAccountFormComponent;
  let fixture: ComponentFixture<VirtualAccountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualAccountFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
