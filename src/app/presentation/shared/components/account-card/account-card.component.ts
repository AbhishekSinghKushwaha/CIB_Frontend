import { Subject } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { PreLoginModal } from 'src/app/core/domain/pre-login-modal.model';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
})
export class AccountCardComponent implements OnInit {
  @Input() data: PreLoginModal;
  @Input() enableClose: boolean;
  @Output() onClose = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void { }

  close() {
    this.onClose.next(true);
  }

}
