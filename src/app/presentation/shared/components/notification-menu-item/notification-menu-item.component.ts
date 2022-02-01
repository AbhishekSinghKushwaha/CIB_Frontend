import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NotificationMenuItem } from 'src/app/core/domain/notification-menu-item.model';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-notification-menu-item',
  templateUrl: './notification-menu-item.component.html',
  styleUrls: ['./notification-menu-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationMenuItemComponent implements OnInit {
  @Input() item: any;
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  constructor() {}

  ngOnInit(): void {}
}
