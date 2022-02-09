import { Component } from '@angular/core';
import { CustomIconService } from './core/utils/custom-icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Corporate Internet Banking';
  constructor(private customIconService: CustomIconService) {
    this.customIconService.init();
  }
}
