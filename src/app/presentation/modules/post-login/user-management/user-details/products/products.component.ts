import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategory } from 'src/app/core/domain/product-category.model';
import { ProductEditorService } from 'src/app/core/services/product-editor/product-editor.service';
import { ProductsConstants } from 'src/app/core/utils/constants/products.constants';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  username: any;

  constructor(private readonly location: Location,
    private readonly activatedRoute: ActivatedRoute) {
    this.username = activatedRoute.snapshot.paramMap.get("username");
  }

  ngOnInit(): void {
  }

}
