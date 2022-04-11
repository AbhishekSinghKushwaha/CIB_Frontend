import { Component } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eazzy-fx',
  templateUrl: './eazzy-fx.component.html',
  styleUrls: ['./eazzy-fx.component.scss'],
})
export class EazzyFxComponent {
  constructor(private readonly router: Router) {}

  navigate(event: MatButtonToggleChange) {
    if (event.value === 'rates') {
      this.router.navigate(['transact/foreign-exchange/eazzy-fx/rates']);
    } else {
      this.router.navigate(['transact/foreign-exchange/eazzy-fx/pair']);
    }
  }
}
