import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-virtual-account-email-verification',
  templateUrl: './virtual-account-email-verification.component.html',
  styleUrls: ['./virtual-account-email-verification.component.scss']
})
export class VirtualAccountEmailVerificationComponent implements OnInit {
  @Output() onSubmit = new Subject<number>();

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    this.onSubmit.next(0);
  }

}
