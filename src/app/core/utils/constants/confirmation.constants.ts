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

const loanrepaymentData = (amount:string, date:string): ConfirmationCompletionModel => ({
  buttonText: 'Done',
  message: 'Loan repayment has been submitted for approval',
  subMessage: `<span class="strong-text">Permanent Ammendment</span><br>
  Transaction of ${amount} was submitted on ${date}. <br><br>
  You will be notified once the transaction has been reviewed
  `,
  icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg',
});

const changePasswordData: ConfirmationCompletionModel = {
  buttonText: 'Done',
  message: 'Your password has been changed successfully!',
  subMessage: 'Use your new password to sign in',
  icon: 'assets/images/icons/visual-support-icons-virtual-account-submission-avatar.svg',
  
};

export const CONFIRMATIONCOMPLETION = { chequeBook, editUserLimit, editCompanyLimit, staticUserData, forgotUsernameData, loanrepaymentData, changePasswordData };
