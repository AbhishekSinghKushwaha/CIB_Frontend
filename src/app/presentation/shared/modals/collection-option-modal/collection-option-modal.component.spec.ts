import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionOptionModalComponent } from './collection-option-modal.component';

describe('CollectionOptionModalComponent', () => {
  let component: CollectionOptionModalComponent;
  let fixture: ComponentFixture<CollectionOptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionOptionModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionOptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
