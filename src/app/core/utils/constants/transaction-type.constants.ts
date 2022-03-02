import { TransferTypeDTO } from "../../domain/transfer.models";

export const TransferType: TransferTypeDTO = {
  OWN_EQUITY: "1",
  INTRA_BANK: "2",
  INTER_BANK: "3",
  EFT: "4",
  SWIFT: "5",
  RTGS: "6",
  BUY_GOODS: "7",
  MOBILE_MONEY: "8",
  BUY_AIRTIME: "9",
  PESALINK: "10",
  INTER_COUNTRY_TRANSFER: "11",
};

const SwiftChargesOptions = [
  {
    option: "Pay full charges",
    description: "You will pay the full amount of the foreign bank charges",
    charge: 1,
  },
  {
    option: "Share Charges",
    description: "Your recipient will account for half of the transfer charges",
    charge: 2,
  },
];

const PaymentCategories = [
  { name: "Oil and allied" },
  { name: "Chemicals" },
  { name: "Manufacturing goods" },
  { name: "Food Imports" },
  { name: "Raw materials (e.g tobacco, rubber)" },
  { name: "Outwards investments" },
];

export const TransactionTypeConstants = {
  TransferType,
  SwiftChargesOptions,
  PaymentCategories,
};
