import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyGoodsFavouritesComponent } from './buy-goods-favourites.component';

describe('BuyGoodsFavouritesComponent', () => {
  let component: BuyGoodsFavouritesComponent;
  let fixture: ComponentFixture<BuyGoodsFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyGoodsFavouritesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyGoodsFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
