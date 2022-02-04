import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-summary-download',
  templateUrl: './registration-summary-download.component.html',
  styleUrls: ['./registration-summary-download.component.scss'],
})
export class RegistrationSummaryDownloadComponent implements OnInit {
  pdfSrc = '/assets/docs/CIBForm.pdf';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  download() {
    let link = document.createElement('a');
    link.download = 'Corporate Internet Banking Form';
    link.href = '/assets/docs/CIBForm.pdf';
    link.click();
    setTimeout(() => {
      this.router.navigate([
        '/auth/customer-onboarding/register/upload-documents',
      ]);
    }, 2000);
  }
}
