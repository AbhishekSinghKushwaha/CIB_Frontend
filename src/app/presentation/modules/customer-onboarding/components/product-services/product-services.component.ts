import { ProductServiceConfirmationModalComponent } from './../../../../shared/modals/product-service-confirmation-modal/product-service-confirmation-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-services',
  templateUrl: './product-services.component.html',
  styleUrls: ['./product-services.component.scss']
})
export class ProductServicesComponent implements OnInit {

  products = [1, 2, 3, 4];

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit() {
  }

  delete() {
    this.products.pop()
  }

  confirmTeamProductAndServices() {
    this.dialog.open<ProductServiceConfirmationModalComponent>(ProductServiceConfirmationModalComponent, {disableClose: true});
  }

}
