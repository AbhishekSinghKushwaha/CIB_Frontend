import { SignOutModal } from './../domain/sign-out-modal.model';
export default class SignoutUtils {
  static getNotificationModalParam(param: SignOutModal): SignOutModal {
    return {
      image: param.image,
      title: param.title,
      message: param.message,
      signoutClicked: !!param.signoutClicked
    }
  }
}
