import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-virtual-account-verification-medium',
  templateUrl: './virtual-account-verification-medium.component.html',
  styleUrls: ['./virtual-account-verification-medium.component.scss']
})
export class VirtualAccountVerificationMediumComponent implements OnInit {
  @Output() onSubmit = new Subject<number>();

  constructor() { }

  ngOnInit(): void {
  }

  submit(next: number) {
    this.onSubmit.next(next);
  }

}
