import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-welcome-info',
  templateUrl: './welcome-info.component.html',
  styleUrls: ['./welcome-info.component.scss']
})
export class WelcomeInfoComponent implements OnInit {
  isOneEquity = true;
  constructor() { }

  ngOnInit(): void {
  }

  backgroundImageUrl() {
    return `url(assets/images/backgrounds/${environment.appInstance}/Landing-pattern.svg)`;
  }

  appLogoSrc() {
    switch (environment.appInstance) {
    case 'bcdc':
      return `./assets/images/logos/${environment.appInstance}/Primary.png`;
    case 'bcdc-mobile':
      return `./assets/images/logos/${environment.appInstance}/BCDC-mobile.svg`;
    case 'one-equity':
      return `./assets/images/logos/${environment.appInstance}/Inverse.svg`;
    default:
      return '';
    }
  }

}
