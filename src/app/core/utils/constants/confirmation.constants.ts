import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';

const chequeBook: ConfirmationCompletionModel = {
  title: 'Confirmation',
  buttonText: 'Done',
  message: 'Service request submitted for approval',
  subMessage: 'Request for cheque book',
  icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg'
};

const editUserLimit: ConfirmationCompletionModel = {
  title: 'Confirmation',
  buttonText: 'Done',
  message: 'Service request submitted for approval',
  subMessage: 'User Limit updated',
  icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg'
};

const editCompanyLimit: ConfirmationCompletionModel = {
  title: 'Confirmation',
  buttonText: 'Done',
  message: 'Service request submitted for approval',
  subMessage: 'Company Limit updated',
  icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg'
};

const staticUserData: ConfirmationCompletionModel = {
  title: 'Confirmation',
  buttonText: 'Done',
  message: 'Service request submitted for approval',
  subMessage: 'Static user data updated',
  icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg'
};

const forgotUsernameData: ConfirmationCompletionModel = {
  buttonText: 'Done',
  message: 'Great!',
  subMessage: 'An email has been sent to the registered email address for this account',
  icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg',
  category: 'small',
};

export const CONFIRMATIONCOMPLETION = { chequeBook, editUserLimit, editCompanyLimit, staticUserData, forgotUsernameData };
