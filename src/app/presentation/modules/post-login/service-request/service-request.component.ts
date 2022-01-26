import { countrySettings } from 'src/app/core/utils/constants/country.settings';
import { Component, OnInit } from '@angular/core';
import { ServiceRequestSettings } from 'src/app/core/utils/constants/service-request.constant';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.scss']
})
export class ServiceRequestComponent implements OnInit {
  serviceRequestLinks = ServiceRequestSettings.dashboardLinks;

  constructor() { }

  ngOnInit(): void { }

}
