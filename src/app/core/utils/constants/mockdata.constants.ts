import { BankModel } from '../../domain/bank.model';
import { CountryModel } from '../../domain/country.model';
import { FavouriteBeneficiaryModel } from './../../domain/favourites-beneficiary.model';
import { SelectAccountModel } from './../../domain/select-account.model';
import { BuyGoodsFavouriteModel } from './../../domain/buy-goods-favourites.model';

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
  id: 1,
  name: 'June Lowela',
  phoneNumber: '+254 700 111 111',
  channel: 'Safaricom',
  country: 'Kenya'
}, {
  id: 2,
  name: 'Kevin Libega',
  phoneNumber: '+256 700 019 019',
  channel: 'MTN',
  country: 'Uganda'
}];

const banks: BankModel[] = [{
  id: 1,
  name: 'Barclays Bank Kenya',
}, {
  id: 2,
  name: 'Commercial Bank of Africa',
}, {
  id: 3,
  name: 'Equity Bank Kenya',
}];

const countries: CountryModel[] = [
  { name: 'Kenya', flag: 'https://flagcdn.com/h60/ke.png' },
  { name: 'Democratic Republic of Congo', flag: 'https://flagcdn.com/h60/cd.png' },
  { name: 'Rwanda', flag: 'https://flagcdn.com/h60/rw.png' },
  { name: 'South Sudan', flag: 'https://flagcdn.com/h60/ss.png' },
  { name: 'Tanzania', flag: 'https://flagcdn.com/h60/tz.png' }
]

const buyGoodsFavourites: BuyGoodsFavouriteModel[] = [{
  id: 1,
  accountName: 'Diners Grill',
  accountNumber: '444400',
  imageLink: './assets/images/icons/visual-support-icon-till.svg'
}, {
  id: 2,
  accountName: 'Afro Home Deliveries',
  accountNumber: '988766',
  imageLink: './assets/images/icons/visual-support-icon-till.svg'
}];


export const mockData = {
  accounts, favourites, banks, countries, buyGoodsFavourites
}