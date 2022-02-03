import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductServiceOptionsComponent } from './product-service-options.component';

describe('ProductServiceOptionsComponent', () => {
  let component: ProductServiceOptionsComponent;
  let fixture: ComponentFixture<ProductServiceOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductServiceOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductServiceOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
