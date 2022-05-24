import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators'
import { PreloadingStrategy, Route } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, loadMe: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      var delay: number = route.data['delay']
      !environment.production && console.log('preload called on ' + route.path + ' delay is ' + delay);
      return timer(delay).pipe(
        flatMap(_ => {
          !environment.production && console.log("Loading now " + route.path);
          return loadMe();
        }));
    } else {
      !environment.production && console.log('no preload for the path ' + route.path);
      return of(null);
    }
  }
}