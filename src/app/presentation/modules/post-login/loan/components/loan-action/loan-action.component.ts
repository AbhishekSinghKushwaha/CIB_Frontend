import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

export interface LoanAction {
  icon: string;
  text: string;
  route: string;
}

@Component({
  selector: 'app-loan-action',
  templateUrl: './loan-action.component.html',
  styleUrls: ['./loan-action.component.scss'],
})
export class LoanActionComponent {
  @Input()
  icon: string;

  @Input()
  text: string;

  @Input()
  route: string;

  constructor(private readonly router: Router) {}

  navigate(): void {
    this.router.navigate([this.route]);
  }
}
