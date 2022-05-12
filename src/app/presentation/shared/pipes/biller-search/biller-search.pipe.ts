import { BillersModel } from './../../../../core/domain/bank.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billerSearch'
})
export class BillerSearchPipe implements PipeTransform {

  transform(value: BillersModel[], searchValue: string): any {
    if (!searchValue) return value;

    return value.filter(
      (v) =>
        v?.name!.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
        v?.code!.toLowerCase().indexOf(searchValue.toLowerCase()) >
        -1
    );
  }
}
