import { Injectable } from '@angular/core';
import { MobileOperatorModel } from '../../domain/mobile-operators.model';

@Injectable()
export class MobileOperatorsConstants {
  constructor() { }
  mobileOperators: MobileOperatorModel[] = [
    {
      imageLink : './assets/images/logos/provider/KE/Airtel.svg',
      name : 'Airtel',
    },
    {
      imageLink : './assets/images/logos/provider/KE/Equitel.svg',
      name : 'Equitel',
    },
    {
      imageLink : './assets/images/logos/provider/KE/Safaricom.svg',
      name : 'Safaricom',
    },
    {
      imageLink : './assets/images/logos/provider/KE/Telkom.svg',
      name : 'Telkom',
    },      
  ]
}