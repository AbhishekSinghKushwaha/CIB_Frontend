import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-onboarding-steps',
  templateUrl: './onboarding-steps.component.html',
  styleUrls: ['./onboarding-steps.component.scss'],
})
export class OnboardingStepsComponent implements OnInit {
  loading: boolean = false;
  constructor(private readonly spinnerService: SpinnerService) {}

  ngOnInit(): void {
    this.loadingListener();
  }

  loadingListener(): void {
    this.spinnerService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading: boolean) => {
        this.loading = loading;
      });
  }
}
