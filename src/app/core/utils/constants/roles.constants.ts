import { Injectable } from '@angular/core';

@Injectable()
export class RolesConstants {
  constructor() { }

  ROLES = {
    INITIATOR: {
        TRANSACTIONS: "role.initiator.transactions",
        UPLOAD_PAYMENT_FILE: "role.initiator.paymentFile",
        RECEIVE_NOTIFICATIONS: "role.initiator.receiveNotifications",
        VIEW_BALANCES: "role.initiator.receiveBalances"
    },
    APPROVER: {
        APPROVE_PAYMENTS: "role.approver.approvePayments",
        VIEW_BALANCES: "role.approver.viewBalances",
        RECEIVE_NOTIFICATIONS: "role.approver.receiveNotifications",
        GENERATE_STATEMENTS: "role.approver.generateStatements",
    },
    SUPER_ADMIN: {
        CREATE_USERS: "role.superadmin.createUsers",
        MODIFY_USERS: "role.superadmin.modifyUsers",
        DELETE_USERS: "role.superadmin.deleteUsers",
        BLOCK_USERS: "role.superadmin.blockUsers"
    }
 }
}
