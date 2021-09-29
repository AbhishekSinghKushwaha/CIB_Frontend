import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { BasicListItemModel } from './../../../../core/domain/basic-list-item.model';

@Component({
  selector: 'app-basic-list',
  templateUrl: './basic-list.component.html',
  styleUrls: ['./basic-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasicListComponent implements OnInit {
  @Input() item: BasicListItemModel;

  constructor( private readonly router: Router) { }

  ngOnInit(): void {
  }

  route(){
    if(this.item.link){
      this.router.navigate([this.item.link]);
    }
  }

}
