import { Injectable } from '@angular/core';
import { TransactDashboardList } from '../../domain/transact-list.model';
import { TransactionTypeModel } from '../../domain/transaction-type.model';


const TRANSACT_TYPE: TransactionTypeModel[] = [{
  id: 1,
  name: 'Money in'
}, {
  id: 2,
  name: 'Money out'
}, {
  id: 3,
  name: 'Bill payment'
}, {
  id: 4,
  name: 'Bank Transfer'
}, {
  id: 5,
  name: 'Mobile payment'
}, {
  id: 6,
  name: 'Pesalink'
}, {
  id: 7,
  name: 'RTGS'
},];

export default TRANSACT_TYPE;
