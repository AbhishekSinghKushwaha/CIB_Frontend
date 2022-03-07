import { KeyValuePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TransferType } from 'src/app/core/utils/constants/transaction-type.constants';
@Pipe({
  name: 'transferTypeLabelPipe'
})
export class TransferTypeLabelPipe implements PipeTransform {

  constructor(private readonly keyVal: KeyValuePipe) {}

  transform(transferTypeKey: string): string   {
    const value = this.keyVal.transform(TransferType).find( (item) => item.value === transferTypeKey)
    
    if (!value)
      return ''

    return value.key;
  }

}
