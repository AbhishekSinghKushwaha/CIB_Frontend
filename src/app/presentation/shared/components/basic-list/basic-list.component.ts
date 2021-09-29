import { Component, Input, OnInit } from '@angular/core';
import { BasicListModel } from './../../../../core/domain/basic-list.model';

@Component({
  selector: 'app-basic-list',
  templateUrl: './basic-list.component.html',
  styleUrls: ['./basic-list.component.scss']
})
export class BasicListComponent implements OnInit {
  @Input() item: BasicListModel;

  constructor() { }

  ngOnInit(): void {
  }

}
