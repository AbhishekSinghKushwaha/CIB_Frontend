import { Pipe, PipeTransform } from '@angular/core';
import { BankSelectionModel } from 'src/app/core/domain/bank-selection.model';

@Pipe({
  name: 'bankSelectionSearch'
})
export class BankSelectionSearchPipe implements PipeTransform {

  transform(value: BankSelectionModel[], searchValue: string): any {
    if (!searchValue) return value;
    return value.filter((v) =>
      v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}
