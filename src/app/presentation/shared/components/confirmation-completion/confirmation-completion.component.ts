import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';

@Component({
  selector: 'app-confirmation-completion',
  templateUrl: './confirmation-completion.component.html',
  styleUrls: ['./confirmation-completion.component.scss']
})
export class ConfirmationCompletionComponent implements OnInit {
  @Input() data: ConfirmationCompletionModel;
  @Output() confirmationDone = new Subject<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  done() {
    this.confirmationDone.next(true);
  }

}
