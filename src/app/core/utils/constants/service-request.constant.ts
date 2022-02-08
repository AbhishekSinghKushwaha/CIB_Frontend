import { CardModel } from "../../domain/card.model";

const dashboardLinks: CardModel[] = [{
  text: 'Request for Cheque Book',
  prefixIcon: 'assets/images/icons/visual-support-icons-sr-chequebook.svg',
  suffixIcon: 'caret_right',
  route: '/service-request/chequebook-request'
}, {
  text: 'Edit User Limit',
  prefixIcon: 'assets/images/icons/visual-support-icons-sr-edit-user-limit.svg',
  suffixIcon: 'caret_right',
  route: '/service-request/user-limit/edit'
}, {
  text: 'Edit Company Limit',
  prefixIcon: 'assets/images/icons/visual-support-icons-sr-edit-company-limit.svg',
  suffixIcon: 'caret_right',
  route: '/service-request/user-limit'
}, {
  text: 'Static Data Update',
  prefixIcon: 'assets/images/icons/visual-support-icons-sr-static-data-update.svg',
  suffixIcon: 'caret_right',
  route: '/service-request/user-limit'
}];

export const ServiceRequestSettings = {
  dashboardLinks
}
