import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserProductOptionsComponent } from './corporate-user-product-options.component';

describe('CorporateUserProductOptionsComponent', () => {
  let component: CorporateUserProductOptionsComponent;
  let fixture: ComponentFixture<CorporateUserProductOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateUserProductOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserProductOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
