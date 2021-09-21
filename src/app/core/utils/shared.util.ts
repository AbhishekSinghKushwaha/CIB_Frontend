import { PreLoginModal } from './../domain/pre-login-modal.model';
export default class ShareUtils {
  static getNotificationModalParam(param: PreLoginModal): PreLoginModal {
    return {
      image: param.image,
      title: param.title,
      message: param.message,
      registerButtonEnabled: !!param.registerButtonEnabled
    }
  }
}
