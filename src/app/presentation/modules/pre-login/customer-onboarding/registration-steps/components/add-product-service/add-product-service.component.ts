import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product-service',
  templateUrl: './add-product-service.component.html',
  styleUrls: ['./add-product-service.component.scss'],
})
export class AddProductServiceComponent implements OnInit {
  options = [1, 2, 3, 4];

  constructor() {}

  ngOnInit() {}
}
