import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-otp-success',
  templateUrl: './otp-success.component.html',
  styleUrls: ['./otp-success.component.scss']
})
export class OtpSuccessComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  done() {
    this.router.navigate(['more'])
      .then(() => {
        window.location.reload();
      });
  }

}
