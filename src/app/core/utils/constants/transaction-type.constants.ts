import {
  ReminderSelectionModel,
  FrequencySelectionModel,
} from "../../domain/scheduled-payment.model";
export const TransferType = {
  OWN_EQUITY: "1",
  LOAN: "111",
  INTRA_BANK: "2",
  EFT: "4",
  SWIFT: "5",
  RTGS: "6",
  BUY_GOODS: "11",
  MOBILE_MONEY: "9",
  BUY_AIRTIME: "10",
  PESALINK: "7",
  SUBSIDIARY: "8",
  BILL_PAYMENT: "9",
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

const FrequencyListings: FrequencySelectionModel[] = [
  {
    frequency: "Once-off",
    description: "Description",
    value: 1,
  },
  {
    frequency: "Daily",
    description: "",
    value: 2,
  },
  {
    frequency: "Weekly",
    description: "",
    value: 3,
  },
  {
    frequency: "Monthly",
    description: "",
    value: 4,
  },
  {
    frequency: "Yearly",
    description: "",
    value: 5,
  },
];

const ReminderListings: ReminderSelectionModel[] = [
  {
    reminder: "No reminder",
    description: "",
    value: 0,
  },
  {
    reminder: "1 day before",
    description: "",
    value: 1,
  },
  {
    reminder: "2 days before",
    description: "",
    value: 2,
  },
  {
    reminder: "3 days before",
    description: "",
    value: 3,
  },
  {
    reminder: "1 week before",
    description: "",
    value: 4,
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
  FrequencyListings,
  ReminderListings,
};
