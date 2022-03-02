import { KeyValuePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TransferTypeDTO } from 'src/app/core/domain/transfer.models';
import { TransactionTypeConstants, TransferType } from 'src/app/core/utils/constants/transaction-type.constants';
@Pipe({
  name: 'transferTypeLabelPipe'
})
export class TransferTypeLabelPipe implements PipeTransform {

  labels = {
    'OWN_EQUITY': "Own Equity",
    'INTRA_BANK': "Intra Bank",
    'INTER_BANK': "Inter Bank",
    'EFT': "EFT",
    'SWIFT': "SWIFT",
    'RTGS': "RTGS",
    'BUY_GOODS': "Buy Goods",
    'MOBILE_MONEY': "Mobile Money",
    'BUY_AIRTIME': "Buy Airtime",
    'PESALINK': "Pesalink",
    'INTER_COUNTRY_TRANSFER': "Inter Country Transfer"
  }
  constructor(private readonly keyVal: KeyValuePipe) {}

  transform(transferTypeKey: string): string   {
    const value = this.keyVal.transform(TransferType).find( (item) => item.value === transferTypeKey)
    
    if (!value)
      return ''

    return value.key;
  }

}
