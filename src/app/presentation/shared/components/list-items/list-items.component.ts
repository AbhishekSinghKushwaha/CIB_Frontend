import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit {
  @Input() data: ConfirmationModel[];
  constructor() { }

  ngOnInit(): void {
  }

}
