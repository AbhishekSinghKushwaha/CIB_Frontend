import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionOptionComponent } from './collection-option.component';

describe('CollectionOptionComponent', () => {
  let component: CollectionOptionComponent;
  let fixture: ComponentFixture<CollectionOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
