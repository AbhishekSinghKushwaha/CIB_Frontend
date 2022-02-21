import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/core/domain/product-category.model';
import { ProductEditorService } from 'src/app/core/services/product-editor/product-editor.service';
import { ProductsConstants } from 'src/app/core/utils/constants/products.constants';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productCategories: ProductCategory[];
  currentCategory: ProductCategory | null;

  selectedProducts: string[];

  constructor(private readonly location: Location,
    private readonly productConstants: ProductsConstants,
    private readonly productService: ProductEditorService) {
      this.productCategories = productConstants.PRODUCT_CATEGORIES;
      this.selectedProducts = [];
     }

  ngOnInit(): void {
  }

  showProducts(category: ProductCategory): void {
    this.currentCategory = category;
  }

  showCategories(): void {
    this.currentCategory = null;
  }

  selectProduct(product: ProductCategory): void {    
    if (this.isProductSelected(product)) {
      this.selectedProducts.splice(this.selectedProducts.findIndex((index) => product.id == index),1);
    } else {
      this.selectedProducts.push(product.id);
    }
  }

  hasProducts(category: ProductCategory): boolean {
    return this.selectedProducts.findIndex( (item) => {
      return item.indexOf(category.id+".") > -1;
    }) > -1;
  }

  isProductSelected(product: ProductCategory): boolean {
    return this.selectedProducts.indexOf(product.id) > -1;
  }

  save(): void {
    this.productService.save(this.selectedProducts);
    this.goBack();
  }
  goBack(): void {
    this.location.back();
  }

}