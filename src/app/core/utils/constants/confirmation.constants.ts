import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';

const chequeBook: ConfirmationCompletionModel = {
  title: 'Confirmation',
  buttonText: 'Done',
  message: 'Service request submitted for approval',
  subMessage: 'Request for cheque book',
  icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg'
};

const userLimit: ConfirmationCompletionModel = {
  title: 'Confirmation',
  buttonText: 'Done',
  message: 'Service request submitted for approval',
  subMessage: 'User Limit updated',
  icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg'
};

export const CONFIRMATIONCOMPLETION = { chequeBook, userLimit };
