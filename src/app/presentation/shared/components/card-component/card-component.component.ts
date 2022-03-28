import { Component, OnInit, Input } from '@angular/core';
import { CardModel } from 'src/app/core/domain/card.model';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss']
})
export class CardComponentComponent implements OnInit {
  @Input() data: CardModel;

  constructor() { }

  ngOnInit(): void {
  }

}
