import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserProductsComponent } from './corporate-user-products.component';

describe('CorporateUserProductsComponent', () => {
  let component: CorporateUserProductsComponent;
  let fixture: ComponentFixture<CorporateUserProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateUserProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
