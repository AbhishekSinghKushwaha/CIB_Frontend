import { Pipe, PipeTransform } from '@angular/core';
import { BankModel } from 'src/app/core/domain/bank.model';

@Pipe({
  name: 'bankSearch',
})
export class BankSearchPipe implements PipeTransform {
  transform(value: BankModel[], searchValue: string): any {
    if (!searchValue) return value;
    return value.filter(
      (v) =>
        v.shortBankName.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  }
}
