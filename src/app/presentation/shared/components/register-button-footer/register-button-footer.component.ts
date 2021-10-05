import { Component, OnInit ,EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-register-button-footer',
  templateUrl: './register-button-footer.component.html',
  styleUrls: ['./register-button-footer.component.scss']
})
export class RegisterButtonFooterComponent implements OnInit {
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  closeModal(): void{
  this.close.emit();
  }

}
