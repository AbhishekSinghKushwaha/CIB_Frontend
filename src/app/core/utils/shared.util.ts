import { PreLoginModal } from './../domain/pre-login-modal.model';
export default class ShareUtils {
  static getNotificationModalParam(param: PreLoginModal): PreLoginModal {
    return {
      image: param.image,
      title: param.title,
      message: param.message,
      buttonText: param.buttonText,
      registerButtonEnabled: !!param.registerButtonEnabled,
      logoutButtonEnabled: !!param.logoutButtonEnabled
    }
  }
}
