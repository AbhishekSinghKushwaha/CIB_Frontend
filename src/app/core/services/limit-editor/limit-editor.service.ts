import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LimitEditorService {
  
  currentUserDetails$ = new BehaviorSubject<FormGroup>({} as FormGroup);

  constructor() { }

  save(roleList: FormGroup): void {
    this.currentUserDetails$.next(roleList)
  }
}
