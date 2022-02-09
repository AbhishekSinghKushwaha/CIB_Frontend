import { Component, OnInit,Output ,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-logout-button-footer',
  templateUrl: './logout-button-footer.component.html',
  styleUrls: ['./logout-button-footer.component.scss']
})
export class LogoutButtonFooterComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  closeModal(): void{
  this.close.emit();
  }


}
