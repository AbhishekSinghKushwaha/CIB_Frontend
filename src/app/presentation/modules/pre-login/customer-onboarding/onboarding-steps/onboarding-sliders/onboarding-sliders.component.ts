import { trigger, transition, style, animate } from '@angular/animations';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationSegment, AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-onboarding-sliders',
  templateUrl: './onboarding-sliders.component.html',
  styleUrls: ['./onboarding-sliders.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(0%)' }),
        animate('700ms ease-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})
export class OnboardingSlidersComponent implements OnInit {
  animationOptions: AnimationOptions = {
    path: './assets/images/motion/Get_started_plain_end.json',
  };

  currentContent = 0;

  currentLoop = 0;

  contentArray: {
    title: string;
    message: string;
    transitionFrames: AnimationSegment;
  }[] = [
    {
      title: 'More than just banking',
      message:
        'With 24/7 access to your accounts, send money, pay your bills, buy airtime, and so much more!',
      transitionFrames: [0, 91],
    },
    {
      title: 'Open an instant account',
      message:
        'Opening an Equity bank account is quick and simple. Say goodbye to long queues!',
      transitionFrames: [91, 209],
    },
    {
      title: 'Lifestyle',
      message:
        'A convenient digital experience that can be tailored to meet your lifestyle needs',
      transitionFrames: [209, 329],
    },
    {
      title: 'Growth',
      message:
        'Grow your money to its full potential with our integrated account management functionality and credit products',
      transitionFrames: [329, 444],
    },
  ];

  private animationItem: AnimationItem;

  constructor(private router: Router, private ngZone: NgZone) {}

  ngOnInit(): void {}

  skipOnboarding(): void {
    this.router.navigate([
      'auth/customer-onboarding/onboard/account-type-options',
    ]);
  }

  animationCreated(animationItem: AnimationItem): void {
    this.animationItem = animationItem;
  }

  changeContent(amount: number): void {
    this.currentContent = this.currentContent + amount;
    this.ngZone.runOutsideAngular(() =>
      this.animationItem.goToAndPlay(
        this.contentArray[this.currentContent].transitionFrames[0],
        true
      )
    );
  }

  gotoContent(index: number): void {
    this.currentContent = index;
    this.changeContent(0);
  }

  enterFrame(): void {
    this.ngZone.run(() => {
      const currentFrame = Math.floor(this.animationItem.currentFrame);

      if (currentFrame >= 91 && currentFrame < 209) {
        if (this.currentContent !== 1) {
          this.currentContent = 1;
        } else {
          return;
        }
      } else if (currentFrame >= 209 && currentFrame < 329) {
        if (this.currentContent !== 2) {
          this.currentContent = 2;
        } else {
          return;
        }
      } else if (currentFrame >= 329 && currentFrame < 444) {
        if (this.currentContent !== 3) {
          this.currentContent = 3;
        } else {
          return;
        }
      } else {
        if (this.currentContent !== 0) {
          this.currentContent = 0;
        } else {
          return;
        }
      }
    });
  }

  endLoop(): void {
    this.animationItem.pause();
  }
}
