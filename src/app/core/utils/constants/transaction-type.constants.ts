
export const TransferType = {
  OWN_EQUITY: "1",
  INTRA_BANK: "2",
  INTER_BANK: "3001",
  EFT: "4",
  SWIFT: "5",
  RTGS: "6",
  BUY_GOODS: "11",
  MOBILE_MONEY: "9",
  BUY_AIRTIME: "10",
  PESALINK: "7",
  INTER_COUNTRY_TRANSFER: "",
  SUBSIDIARY: "8",
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
  TransferType,
  SwiftChargesOptions,
};
