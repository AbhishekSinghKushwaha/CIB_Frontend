import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductEditorService {
  
  selected = new BehaviorSubject<string[]>([]);

  constructor() { }

  save(productList: string[]): void {
    this.selected.next(productList)
  }
}
