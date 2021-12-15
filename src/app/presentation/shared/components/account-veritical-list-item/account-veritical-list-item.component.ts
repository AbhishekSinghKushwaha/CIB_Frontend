import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-veritical-list-item',
  templateUrl: './account-veritical-list-item.component.html',
  styleUrls: ['./account-veritical-list-item.component.scss']
})
export class AccountVeriticalListItemComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  loadFormWizard() {
    this.router.navigate([
      '/account/virtual-account/new-account',
    ]);
  }

}
