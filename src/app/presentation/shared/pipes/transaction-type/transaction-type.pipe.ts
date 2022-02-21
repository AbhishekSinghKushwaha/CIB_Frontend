import { Pipe, PipeTransform } from '@angular/core';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
@Pipe({
  name: 'transactionTypePipe'
})
export class TransactionTypePipe implements PipeTransform {

  transform(transactionTypeId: number): string | undefined {
    return TransactionTypeConstants.TRANSACT_TYPE.find((v) => v.id === transactionTypeId)?.name
  }

}
