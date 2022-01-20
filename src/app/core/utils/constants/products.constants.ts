import { Injectable } from '@angular/core';

@Injectable()
export class RolesConstants {
  constructor() { }

  PRODUCTS = {
    PAYMENT: {
        TRANSACTIONS: "role.initiator.transactions",
        UPLOAD_PAYMENT_FILE: "role.initiator.paymentFile",
        RECEIVE_NOTIFICATIONS: "role.initiator.receiveNotifications",
        VIEW_BALANCES: "role.initiator.receiveBalances"
    },
    LOANS: {},
    AGENTS: {},
    MERCHANTS: { },
    CORE_ACCOUNT_SERVICES: {},
    HOST_TO_HOST: {}
 }
}
