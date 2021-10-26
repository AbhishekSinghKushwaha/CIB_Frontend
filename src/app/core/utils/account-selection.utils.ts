import { AccountSelectionModal } from '../domain/account-selection.model';
export default class AccountSelectionUtils {
  static getAccountTitleModalParam(param: AccountSelectionModal): AccountSelectionModal {
    return {
      title: param.title,
      content: param.content
    }
  }
}
