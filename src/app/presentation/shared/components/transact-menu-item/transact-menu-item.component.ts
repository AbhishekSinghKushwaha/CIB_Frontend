import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TransactMenuItem } from 'src/app/core/domain/transact-menu-item.model';

@Component({
  selector: 'app-transact-menu-item',
  templateUrl: './transact-menu-item.component.html',
  styleUrls: ['./transact-menu-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactMenuItemComponent implements OnInit {
  @Input() item: TransactMenuItem;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  route(){
    if(this.item.link){
      this.router.navigate([this.item.link]);
    }
  }

}
