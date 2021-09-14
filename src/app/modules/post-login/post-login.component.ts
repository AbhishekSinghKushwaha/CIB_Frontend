import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { delay} from 'rxjs/operators';

@Component({
  selector: 'app-post-login',
  templateUrl: './post-login.component.html',
  styleUrls: ['./post-login.component.scss']
})
export class PostLoginComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSidenav) 
  sidenav!: MatSidenav;

  mobileQuery!: MediaQueryList;
  private mobileQueryListener!: () => void;
  constructor(private observer: BreakpointObserver, private changeDetectorRef: ChangeDetectorRef, private mediaMatcher: MediaMatcher, private router: Router) { 
    this.getMobileQuery();
    this.mobileQueryListener = (): void => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener("change",this.mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (this.mobileQuery) {
      this.mobileQuery.removeEventListener("change", this.mobileQueryListener)
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

}
