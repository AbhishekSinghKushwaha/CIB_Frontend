import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectionOptionService } from 'src/app/core/services/collection-option/collection-option.service';
import { CollectionDeliveryOption } from 'src/app/core/utils/constants/collection-delivery-option.settings';

@Component({
  selector: 'app-collection-option-modal',
  templateUrl: './collection-option-modal.component.html',
  styleUrls: ['./collection-option-modal.component.scss']
})
export class CollectionOptionModalComponent implements OnInit {
  constructor(
    private readonly collectionOptionService: CollectionOptionService,
    @Inject(MAT_DIALOG_DATA) public options: string[]) { }

  ngOnInit(): void {
  }

  select(item: string) {

  }

  close() {

  }
}
