import { FavouriteBeneficiaryModel } from './../../domain/favourites-beneficiary.model';
import { SelectAccountModel } from './../../domain/select-account.model';

const accounts: SelectAccountModel[] = [{
  name: 'Loot',
  balance: 999999999.99,
  currency: 'KES',
  type: 'Savings'
}, {
  name: '0700000000',
  balance: 30000,
  currency: 'KES',
  type: 'Mobile account'
}, {
  name: '073019380132',
  balance: 4430000,
  currency: 'KES',
  type: 'Current'
}];

const favourites: FavouriteBeneficiaryModel[] = [{
  name: 'June Lowela',
  phoneNumber: '+254 700 111 111',
  channel: 'Safaricom',
  country: 'Kenya'
}, {
  name: 'Kevin Libega',
  phoneNumber: '+256 700 019 019',
  channel: 'MTN',
  country: 'Uganda'
}];

export const mockData = {
  accounts, favourites
}
