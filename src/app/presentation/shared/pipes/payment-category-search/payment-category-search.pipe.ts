import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentCategorySearch',
})
export class PaymentCategorySearchPipe implements PipeTransform {
  transform(value: any, searchValue: string): any {
    if (!searchValue) return value;

    return value.filter((v: any) =>
      v.name.toLowerCase().indexOf(searchValue.toLowerCase())
    );
  }
}
