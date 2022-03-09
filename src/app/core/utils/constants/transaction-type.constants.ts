const TRANSACT_TYPE = [
  {
    id: 1,
    name: "Money in",
  },
  {
    id: 2,
    name: "Money out",
  },
  {
    id: 3,
    name: "Bill payment",
  },
  {
    id: 4,
    name: "Bank Transfer",
  },
  {
    id: 5,
    name: "Mobile payment",
  },
  {
    id: 6,
    name: "Pesalink",
  },
  {
    id: 7,
    name: "RTGS",
  },
];

const TransferType = {
  OWN_EQUITY: "1",
  INTRA_BANK: "2",
  INTER_BANK: "3",
  EFT: "4",
  SWIFT: "5",
  RTGS: "6",
  BUY_GOODS: "11",
  MOBILE_MONEY: "8",
  BUY_AIRTIME: "9",
  PESALINK: "7",
  INTER_COUNTRY_TRANSFER: "10",
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

export const TransactionTypeConstants = {
  TRANSACT_TYPE,
  TransferType,
  SwiftChargesOptions,
};
