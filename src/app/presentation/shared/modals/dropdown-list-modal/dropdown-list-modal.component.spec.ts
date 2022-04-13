import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownListModalComponent } from './dropdown-list-modal.component';

describe('DropdownListModalComponent', () => {
  let component: DropdownListModalComponent;
  let fixture: ComponentFixture<DropdownListModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownListModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
