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
  SUBSIDIARY: "8",
  BILL_PAYMENT: "9"
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

export const TransactionApprovalStatus = {
  Approved: 1,
  PendingApproval: 2,
  PendingVerification: 3,
  Verified: 4,
  Rejected: 5,
  Pending: 6,
};

export const TransactionTypeConstants = {
  TransferType,
  SwiftChargesOptions,
  TransactionApprovalStatus,
};
