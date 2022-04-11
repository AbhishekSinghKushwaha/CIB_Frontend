import { DropdownModal } from "../../domain/prompt.model";

const LOGIN_STAGES = {
  SMS_VERIFICATION: 'sms-verification',
  SECURITY_CHALLENGE: 'security-challenge',
  SECURITY_VERIFICATION: 'security-verification',
  LOGIN_SUCCESS: 'login-successful'
};

const FORGOT_LOGIN_DETAILS: DropdownModal<string> = {
  title: 'Details',
  description: 'Please select the details you forgot',
  list: ['Username', 'Password']
};
const LOGIN_CONSTANTS = {
  LOGIN_STAGES,
  FORGOT_LOGIN_DETAILS
}
export default LOGIN_CONSTANTS;
