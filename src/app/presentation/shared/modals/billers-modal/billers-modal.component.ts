import { BillersService } from './../../../../core/services/modal-services/billers.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { BillersModel } from './../../../../core/domain/bank.model';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-billers-modal',
  templateUrl: './billers-modal.component.html',
  styleUrls: ['./billers-modal.component.scss']
})
export class BillersModalComponent implements OnInit {

  selected: BillersModel;
  searchText: string;

  constructor(
    private readonly storageService: StorageService,
    private readonly billersService: BillersService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selected = data
  }

  ngOnInit() {
  }

  close(): void {
    console.log(this.selected);
    this.billersService.closeBillersModal(this.selected)
  }

  onSelectBiller(event: any) {
    this.selected = event
  }
}
