import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';

@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.scss'],
})
export class PostLoginComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  mobileQuery!: MediaQueryList;
  private mobileQueryListener!: () => void;
  loading: boolean = false;
  constructor(
    private observer: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaMatcher: MediaMatcher,
    private router: Router,
    private spinnerService: SpinnerService
  ) {
    this.getMobileQuery();
    this.mobileQueryListener = (): void => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this.mobileQueryListener);
  }

  ngOnInit(): void {
    this.loadingListener();
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    if (this.mobileQuery) {
      this.mobileQuery.removeEventListener('change', this.mobileQueryListener);
    }
  }

  getMobileQuery(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes('verify')) {
      this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 1024px)');
    } else {
      this.mobileQuery = this.mediaMatcher.matchMedia('(max-width: 970px)');
    }
  }

  loadingListener(): void {
    this.spinnerService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading: boolean) => {
        this.loading = loading;
      });
  }
}
