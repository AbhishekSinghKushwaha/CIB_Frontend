import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SnackbarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    const genericErrorMessage = $localize`:@@loco\:60d9ab07d0d32c4a9a232833:generic-error-message`;

    if (!this.data.message || typeof this.data.message !== 'string') {
      this.data.message = genericErrorMessage;
    }
  }

  ngOnInit(): void {
    console.log(this.data);
  }
}
