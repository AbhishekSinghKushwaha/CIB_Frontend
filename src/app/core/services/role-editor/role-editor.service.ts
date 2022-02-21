import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleEditorService {
  
  selected = new BehaviorSubject<string[]>([]);

  constructor() { }

  save(roleList: string[]): void {
    this.selected.next(roleList)
  }
}
