import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  searchText: string;
  constructor() { }

  ngOnInit(): void {
  }

  applyFilter() {

  }

}
