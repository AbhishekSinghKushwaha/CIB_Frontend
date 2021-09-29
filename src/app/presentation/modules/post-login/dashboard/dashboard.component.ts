import { Component, OnInit } from '@angular/core';
import { DashboardConstants } from '../../../../core/utils/constants/dashboard.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public readonly dashboardList: DashboardConstants) { }

  ngOnInit(): void {
  }

}
