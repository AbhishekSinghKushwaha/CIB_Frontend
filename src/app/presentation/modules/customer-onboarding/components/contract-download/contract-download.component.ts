import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-download',
  templateUrl: './contract-download.component.html',
  styleUrls: ['./contract-download.component.scss']
})
export class ContractDownloadComponent implements OnInit {
  pdfSrc = "/assets/docs/pdf-to-download.pdf";

  constructor() { }

  ngOnInit() {
  }

}
