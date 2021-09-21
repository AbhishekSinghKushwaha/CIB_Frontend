import { PreLoginModal } from './../domain/pre-login-modal.model';
export const generateNotificationModalParam = (param: PreLoginModal): PreLoginModal => ({
      image: param.image,
      title: param.title,
      message: param.message,
      registerButtonEnabled: !!param.registerButtonEnabled
    })
