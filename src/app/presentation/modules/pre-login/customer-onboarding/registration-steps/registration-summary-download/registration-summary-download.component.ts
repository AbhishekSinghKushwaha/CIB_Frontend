import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-summary-download',
  templateUrl: './registration-summary-download.component.html',
  styleUrls: ['./registration-summary-download.component.scss'],
})
export class RegistrationSummaryDownloadComponent implements OnInit {
  pdfSrc = '/assets/docs/pdf-to-download.pdf';
  constructor() {}

  ngOnInit(): void {}
}
